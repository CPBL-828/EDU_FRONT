export interface defaultInterface {
  KEY: string;
  VALUE: string | defaultInterface[];
}

export interface categoryInterface {
  KEY: string;
  VALUE: string | categoryInterface[];
  ICON?: string;
  HAS_CHILD?: boolean;
}

export interface studentInterface {
  studentKey: string;
  parentKey: string;
  name: string;
  id: string;
  birth: string;
  sex: string;
  phone: string;
  school: string;
  grade: string;
  address: string;
  remark: string;
  delState: string;
  profileImg: string;
  createDate: string;
  editDate: string;
}

export interface parentInterface {
  parentKey: string;
  name: string;
  id: string;
  phone: string;
  createDate: string;
  editDate: string;
}

export interface teacherInterface {
  teacherKey: string;
  name: string;
  id: string;
  phone: string;
  email: string;
  part: string;
  resSubject: string;
  joinDate: string;
  leaveDate: string;
  resume: string;
  profileImg: string;
  link: string;
  createDate: string;
  editDate: string;
}

export interface adminInterface {
  adminKey: string;
  type: string;
  id: string;
  createDate: string;
  editDate: string;
}

export interface noticeInterface {
  noticeKey: string;
  type: string;
  writerKey: string;
  readerKey: string;
  delState: string;
  title: string;
  content: string;
  createDate: string;
  editDate: string;
}

export interface suggestInterface {
  suggestKey: string;
  adminKey: string;
  writerKey: string;
  writerName: string;
  type: string;
  state: string;
  content: string;
  answer: string;
  answerDate: string;
  createDate: string;
  editDate: string;
}

export interface scheduleInterface {
  lectureKey: string;
  roomKey_id: string;
  teacherKey_id: string;
  adminKey_id: string;
  lectureName: string;
  teacherName: string;
  roomName: string;
  type: string;
  subject: string;
  book: string;
  target: string;
  day: number;
  startTime: string;
  duration: number;
  suggestDate: string;
  progress: string;
  reason: string;
  createDate: string;
  editDate: string;
  start: number;
  minute: number;
}

export interface consultInterface {
  consultKey: string;
  studentKey_id: string;
  studentName: string;
  targetKey: string;
  consultDate: string;
  consultType: string;
  content: string;
  createDate: string;
  editDate: string;
}

export interface roomInterface {
  roomKey: string;
  name: string;
  type: string;
  totalPeople: number;
  createDate: string;
  editDate: string;
}

export interface analysisInterface {
  analysisKey: string;
  studentKey: string;
  studentName: string;
  writerKey: string;
  writerName: string;
  content: string;
  createDate: string;
  editDate: string;
}
