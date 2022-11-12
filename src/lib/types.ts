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
  id: string;
  name: string;
  phone: string;
  createDate: string;
  editDate: string;
  studentKey: string;
}

export interface teacherInterface {
  createDate: string;
  editDate: string;
  id: string;
  joinDate: string;
  leaveDate: string;
  name: string;
  part: string;
  profileImg: string;
  resSubject: string;
  resume: string;
  teacherKey: string;
  phone: string;
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
  writerKey: string;
  type: string;
  state: string;
  content: string;
  createDate: string;
  editDate: string;
  adminKey: string;
}

export interface scheduleInterface {
  name: string;
  time: string;
  startTime: number;
  startMinute: number;
  startDay: number;
  duration: number;
}
