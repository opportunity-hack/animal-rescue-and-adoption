import { HttpStatusCode } from 'axios';
import { CookieOptions } from 'express';
import { LoginTicket, OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { UserCRUD } from '../../../database/Services/UserCRUD';
import { UserRoleCRUD } from '../../../database/Services/UserRoleCRUD';
import { Catchable } from '../../../library/Decorators/Catchable';
import { Checkable } from '../../../library/Decorators/Checkable';
import {
  InvalidCredentials,
  MissingPayload
} from '../../../library/Errors/Auth';
import { Globals } from '../../../library/Globals/Globals';
import {
  Handler,
  IHasChecks,
  ServerEvent
} from '../../../library/Interfaces/HandlerController';

type GooglePayload = {
  client_id?: string;
  credential?: string;
};

type CustomTokenPayload = {
  sub: string;
  email: string;
  name: string;
  picture: string;
};

@Checkable
export class GoogleAuth extends Handler<ServerEvent> implements IHasChecks {
  private client = new OAuth2Client();
  private declare client_id: string;
  private declare credential: string;
  private declare ticket: LoginTicket;
  private declare payload: CustomTokenPayload;

  constructor(event: ServerEvent) {
    super(event);
  }

  private checkClientAndCredential(): void {
    const body = this.event.req.body as GooglePayload;

    if (!body.client_id || !body.credential) {
      throw new InvalidCredentials('Missing client_id or credential');
    }

    this.client_id = body.client_id;
    this.credential = body.credential;
  }

  private async verifyCredential(): Promise<void> {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: this.credential,
        audience: this.client_id
      });
      this.ticket = ticket;
    } catch (error) {
      throw new InvalidCredentials('Credential Error');
    }
  }

  private checkPayload(): void {
    const payload = this.ticket.getPayload();
    if (!payload) {
      throw new MissingPayload('No payload');
    }
    if (
      'sub' in payload &&
      'email' in payload &&
      'name' in payload &&
      'picture' in payload
    ) {
      this.payload = payload as CustomTokenPayload;
    } else {
      throw new MissingPayload('Missing required fields');
    }
  }

  @Catchable()
  public async runChecks(): Promise<void> {
    this.checkClientAndCredential();
    await this.verifyCredential();
    this.checkPayload();
  }

  @Catchable()
  async execute(): Promise<void> {
    // Get the payload from the ticket
    const payload = this.ticket.getPayload();
    if (!payload) throw new Error('No payload');

    // Get the user ID from the payload
    const { sub: userid, email, name, picture } = payload;
    if (!userid || !email || !name || !picture)
      throw new Error('Missing required fields');

    // Check if the user already exists
    let existingUser = await UserCRUD.getUserByGoogleID(userid);
    if (!existingUser) {
      // Find the basic role so they dont have access to anything
      const basicRole = await UserRoleCRUD.findRoleByName('basic');

      // Create User
      existingUser = await UserCRUD.createUser({
        google_id: this.payload.sub,
        email: this.payload.email,
        name: this.payload.name,
        picture: this.payload.picture,
        role: basicRole._id
      });
    }

    // Send back the user and a cookie with the JWT
    const token = jwt.sign({ existingUser }, Globals.JWT_SECRET);
    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: Globals.IS_PRODUCTION, // Use secure in production
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 90 // 90 days
    };
    this.event.res
      .status(HttpStatusCode.Ok)
      .cookie('token', token, cookieOptions)
      .json({ ...existingUser });

    return await new Promise((resolve) => resolve());
  }
}
