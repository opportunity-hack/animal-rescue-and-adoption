import { z } from 'zod';
import { AnimalSex, NewAnimalData } from '../../library/Types/Animal';

export class JotformParser {
  private static rawDataSchema = z.object({
    name: z.string(),
    species: z.string(),
    sex: z.nativeEnum(AnimalSex),
    images: z.array(z.string().url())
  });

  public static parse(dataStr: string): NewAnimalData {
    const namePattern = /"q6_name"\s*:\s*"([^"]+)"/;
    const speciesPattern = /"q3_species"\s*:\s*"([^"]+)"/;
    const sexPattern = /"q4_sex"\s*:\s*"([^"]+)"/;
    const imagesPattern = /"images"\s*:\s*(\[[^\]]*\])/s;

    const nameMatch = dataStr.match(namePattern);
    const speciesMatch = dataStr.match(speciesPattern);
    const sexMatch = dataStr.match(sexPattern);
    const imagesMatch = dataStr.match(imagesPattern);

    if (!nameMatch || !speciesMatch || !sexMatch || !imagesMatch) {
      throw new Error('Failed to extract required fields from data.');
    }

    const name = this.escapeJSONString(nameMatch[1]);
    const species = this.escapeJSONString(speciesMatch[1]);
    const sex = this.mapSex(sexMatch[1]);
    const images = JSON.parse(imagesMatch[1]) as string[];

    const data = {
      name,
      species,
      sex,
      images
    };

    const parsedData = this.rawDataSchema.parse(data);

    return {
      name: parsedData.name,
      species: parsedData.species,
      sex: parsedData.sex,
      images: parsedData.images
    };
  }

  private static mapSex(sexStr: string): AnimalSex {
    switch (sexStr.trim().toLowerCase()) {
      case 'male':
        return AnimalSex.MALE;
      case 'female':
        return AnimalSex.FEMALE;
      default:
        return AnimalSex.UNKNOWN;
    }
  }

  private static escapeJSONString(str: string): string {
    return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  }
}
