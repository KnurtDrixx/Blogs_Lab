export interface IBlog {
  id: number;
  title: string;
  content: string;
  authorid: number;
  _created: Date | string;
}

export interface NewBlog {
  title: string;
  content: string;
  authorid: number;
}

export interface IAuthors {
  id: number;
  name: string;
  email: string;
  _created: Date | string;
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
