export interface IBlog {
  id: number;
  title: string;
  content: string;
  authorid: number;
  _created: Date | string;
  tag: string;
}

export interface NewBlog {
  title: string;
  content: string;
  authorid?: number;
}

export interface IAuthors {
  id: number;
  name: string;
  email: string;
  password?: string;
  _created: Date | string;
}

export interface NewAuthor {
  name: string;
  email: string;
  password: string;
}

export interface ITags {
  id: number;
  name: string;
  _created: Date | string;
}
export interface IBlogTags {
  blogid: number;
  tagid: number;
}
//create types for the rest of the queries

// export {}; // hacky TS error workaround fuck my life

declare global {
  namespace Express {
    export interface Request {
      payload: Payload;
    }
  }
}

// export interface RequestWithPayload extends express.Request {
//   payload: Payload;
// }

export interface Payload {
  email: string;
  id: number;
}
