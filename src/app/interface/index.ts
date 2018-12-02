export interface ICategory {
  name: string;
  color: string;
  _id: string;
}

export interface IArticle {
  title: string;
  category: string;
  content: string;
  createTime: string;
  updateTime: string;
  uploads: { name: string; url: string }[];
}
