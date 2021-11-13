export interface MainNavData {
  id: string
  sectionTitle: string;
  chapters: Chapter[];
}

export interface Chapter {
  chapterTitle: string;
  id: string;
}

export interface MainNavDataOnCreate {
  id?: string
  sectionTitle: string;
  chapters: ChapterOnCreate[];
}

export interface ChapterOnCreate {
  chapterTitle: string;
  id?: string;
}

export interface TabsLink {
  linkTitle: string;
  sectionRouteTitle: string;
}
// [[{type: text, content: 'some-content'}, {type: code}, {type: text}], [{type: code}, {type: text}, {type: text}]]
export interface TheoryData {
  id: string;
  type: string;
  content: string;
  codeLang?: string;
}

export interface TheoryDataOnCreate {
  type: string;
  content: string;
  codeLang?: string;
}

export interface TestData {
  id: string;
  taskTitle: string;
  answers: string[];
  rightAnswer: string;
  taskCode?: string;
}

export interface TestDataOnCreate {
  id?: string
  taskTitle: string;
  answers: string[];
  rightAnswer: string;
  taskCode?: string;
}

export interface TaskData {
  id: string
  taskText: string
  taskCode: string
  answerCode: string
}

export interface UserData {
  nickName?: string
  img?: string
  userId?: string
}

export interface Comment {
  id?: string
  title: string
  content: string,
  userData: UserData
  likes: number
  dislikes: number
}

export interface NewComment {
  userId?: string
  token: string
  title: string
  content: string
}