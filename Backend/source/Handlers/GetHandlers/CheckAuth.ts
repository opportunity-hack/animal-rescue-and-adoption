import { HttpStatusCode } from 'axios';
import jwt from 'jsonwebtoken';
import { UserCRUD } from '../../../database/Services/UserCRUD';
import { Catchable } from '../../../library/Decorators/Catchable';
import { Checkable } from '../../../library/Decorators/Checkable';
import {
  MissingCookies,
  MissingToken,
  MissingUser
} from '../../../library/Errors/Auth';
import { Globals } from '../../../library/Globals/Globals';
import {
  Handler,
  IHasChecks,
  ServerEvent
} from '../../../library/Interfaces/HandlerController';
@Checkable
export class CheckAuth extends Handler<ServerEvent> implements IHasChecks {
  private cookies;
  private declare token: string;
  private declare user: { _id: string };

  constructor(event: ServerEvent) {
    super(event);
    this.cookies = this.event.req.cookies;
  }

  private checkCookies(): void {
    if (!this.cookies || typeof this.cookies.token !== 'string') {
      throw new MissingCookies('No valid cookies provided');
    }
    this.token = this.cookies.token;
  }

  private checkToken(): void {
    if (!this.token) {
      throw new MissingToken('Missing authentication token');
    }
  }

  private checkDecodedUser(): void {
    const decoded = jwt.verify(this.token, Globals.JWT_SECRET) as {
      existingUser: { _id: string };
    };
    if (!decoded.existingUser) {
      throw new MissingUser('User not found');
    }
    this.user = decoded.existingUser;
  }

  @Catchable()
  public async runChecks(): Promise<void> {
    this.checkCookies();
    this.checkToken();
    this.checkDecodedUser();

    await new Promise((resolve) => {
      resolve(void 0);
    });
  }

  @Catchable()
  async execute(): Promise<void> {
    //Check if the cookies are provided
    const cookies = this.event.req.cookies;
    if (!cookies) {
      this.event.res.status(HttpStatusCode.Unauthorized).json({
        authenticated: false,
        message: 'No cookies provided'
      });
      return;
    }

    //Check if the token is provided
    const token = this.event.req.cookies.token as string | undefined;
    if (!token) {
      this.event.res.status(HttpStatusCode.Unauthorized).json({
        authenticated: false,
        message: 'No token provided'
      });
      return;
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, Globals.JWT_SECRET) as {
        existingUser: { _id: string };
      };

      //Check if the user exists
      if (!decoded.existingUser) {
        this.event.res.status(HttpStatusCode.Unauthorized).json({
          authenticated: false,
          message: 'User not found'
        });
        return;
      }

      // Fetch the user from the database
      const existingUser = decoded.existingUser;
      const user = await UserCRUD.getUserById(existingUser._id);

      //Check if the user exists
      if (!user) {
        this.event.res.status(HttpStatusCode.NotFound).json({
          authenticated: false,
          message: 'User not found'
        });
        return;
      }

      // If everything is okay, send the user data
      this.event.res.status(HttpStatusCode.Ok).json({
        authenticated: true,
        data: {
          _id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          picture: user.picture
        }
      });
    } catch (error) {
      // If token is invalid or expired
      this.event.res.status(HttpStatusCode.Unauthorized).json({
        authenticated: false,
        message: 'Invalid or expired token'
      });
    }
  }
}
