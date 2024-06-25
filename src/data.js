export const students = [
  {
    id: 1,
    theName: "علي محمد جمال",
    userName: "A1",
    password: "1",
    department: "علوم الحاسوب",
    photo: require("./assets/student1.jpg"),
  },
  {
    id: 2,
    theName: "فاطمة احمد خالد",
    userName: "F2",
    password: "2",
    department: "الرياضيات",
    photo: require("./assets/student3.jpg"),
  },
  {
    id: 3,
    theName: "حسن عمر عدنان",
    userName: "H3",
    password: "3",
    department: "علوم الحاسوب",
    photo: require("./assets/student2.jpg"),
  },
  {
    id: 4,
    theName: "ليلى وليد محمد",
    userName: "L4",
    password: "4",
    department: "الرياضيات",
    photo: require("./assets/student4.jpg"),
  },
];
/*====================================== */
export const subjects = [
  // مواد علوم الحاسوب
  {
    id: 1,
    name: "تقنيات الويب ٣",
    units: 3,
    department: "علوم الحاسوب",
    type: "optional",
  },
  {
    id: 2,
    name: "ملتيميديا",
    units: 3,
    department: "علوم الحاسوب",
    type: "optional",
  },
  {
    id: 3,
    name: "أنظمة حواسيب متقدمة",
    units: 2,
    department: "علوم الحاسوب",
    type: "mandatory",
  },
  {
    id: 4,
    name: "أمنية حواسيب متقدمة",
    units: 2,
    department: "علوم الحاسوب",
    type: "optional",
  },
  {
    id: 5,
    name: "تقنيات الذكاء الاصطناعي",
    units: 2,
    department: "علوم الحاسوب",
    type: "optional",
  },
  {
    id: 6,
    name: "اللغة الانكليزية",
    units: 2,
    department: "علوم الحاسوب",
    type: "optional",
  },
  {
    id: 7,
    name: "شبكات الحواسيب",
    units: 2,
    department: "علوم الحاسوب",
    type: "mandatory",
  },
  {
    id: 8,
    name: "برمجة متوازية",
    units: 3,
    department: "علوم الحاسوب",
    type: "optional",
  },
  {
    id: 9,
    name: "أنترنت الأشياء",
    units: 2,
    department: "علوم الحاسوب",
    type: "optional",
  },
  {
    id: 10,
    name: "ضغط البيانات",
    units: 3,
    department: "علوم الحاسوب",
    type: "optional",
  },
  {
    id: 11,
    name: "علم البيانات",
    units: 2,
    department: "علوم الحاسوب",
    type: "optional",
  },
  {
    id: 12,
    name: "منهج البحث",
    units: 0,
    department: "علوم الحاسوب",
    type: "optional",
  },

  // مواد علوم الرياضيات
  {
    id: 13,
    name: "التحليل الرياضي",
    units: 2,
    department: "الرياضيات",
    type: "optional",
  },
  {
    id: 14,
    name: "جبر الزمر",
    units: 2,
    department: "الرياضيات",
    type: "mandatory",
  },
  {
    id: 15,
    name: "معادلات تفاضلية",
    units: 2,
    department: "الرياضيات",
    type: "mandatory",
  },
  {
    id: 16,
    name: "تعلم الآلة",
    units: 2,
    department: "الرياضيات",
    type: "optional",
  },
  {
    id: 17,
    name: "احصاء رياضي",
    units: 2,
    department: "الرياضيات",
    type: "mandatory",
  },
  {
    id: 18,
    name: "فوضى بيان قابلة للتغير",
    units: 2,
    department: "الرياضيات",
    type: "optional",
  },
  {
    id: 19,
    name: "اللغة الانكليزية",
    units: 2,
    department: "الرياضيات",
    type: "optional",
  },
  {
    id: 20,
    name: "منهج البحث",
    units: 2,
    department: "الرياضيات",
    type: "optional",
  },
  {
    id: 21,
    name: "الرياضيات المتقدمة",
    units: 3,
    department: "الرياضيات",
    type: "optional",
  },
  {
    id: 22,
    name: "Functional Analysis",
    units: 2,
    department: "الرياضيات",
    type: "optional",
  },
  {
    id: 23,
    name: "TopologyII",
    units: 3,
    department: "الرياضيات",
    type: "optional",
  },
  {
    id: 24,
    name: "Complex Analysis",
    units: 2,
    department: "الرياضيات",
    type: "optional",
  },
];

export const professors = [
  // أساتذة الذكاء
  {
    id: 1,
    name: "د. محمد اكثم",
    subject: "تقنيات الذكاء الاصطناعي",
    timeAvailable: "9:00 ص",
    theDay: "الأحد",
  },
  {
    id: 2,
    name: "د. محمود ماهر",
    subject: "تقنيات الذكاء الاصطناعي",
    timeAvailable: "11:30 ص",
    theDay: "الإثنين",
  },
  {
    id: 3,
    name: "د. زيدون",
    subject: "تقنيات الذكاء الاصطناعي",
    timeAvailable: "9:00 ص",
    theDay: "الثلاثاء",
  },

  // أساتذة تعلم الآلة
  {
    id: 4,
    name: "د. سلوى",
    subject: "تعلم الآلة",
    timeAvailable: "12:30 م",
    theDay: "الأحد",
  },

  // أساتذة الملتيميديا
  {
    id: 5,
    name: "ا. وسام عبدالله",
    subject: "ملتيميديا",
    timeAvailable: "9:00 ص",
    theDay: "الإثنين",
  },

  // أساتذة الشبكات
  {
    id: 6,
    name: "د. مشاري",
    subject: "شبكات الحواسيب",
    timeAvailable: "12:30 م",
    theDay: "الثلاثاء",
  },
  {
    id: 7,
    name: "د. مهند",
    subject: "شبكات الحواسيب",
    timeAvailable: "9:00 ص",
    theDay: "الإثنين",
  },
  {
    id: 8,
    name: "د. ماجد",
    subject: "شبكات الحواسيب",
    timeAvailable: "11:30 ص",
    theDay: "الأحد",
  },

  // أساتذة البرمجة المتوازية
  {
    id: 9,
    name: "د. محمد اكثم",
    subject: "برمجة متوازية",
    timeAvailable: "9:00 ص",
    theDay: "الأحد",
  },
  {
    id: 10,
    name: "د. زيدون",
    subject: "برمجة متوازية",
    timeAvailable: "12:30 م",
    theDay: "الإثنين",
  },
  {
    id: 11,
    name: "د. سلوى",
    subject: "برمجة متوازية",
    timeAvailable: "9:00 ص",
    theDay: "الثلاثاء",
  },

  // أساتذة أنترنت الأشياء
  {
    id: 12,
    name: "د. مهند",
    subject: "أنترنت الأشياء",
    timeAvailable: "12:30 م",
    theDay: "الأحد",
  },
  {
    id: 13,
    name: "د. ماجد",
    subject: "أنترنت الأشياء",
    timeAvailable: "12:30 م",
    theDay: "الإثنين",
  },

  // أساتذة علم البيانات
  {
    id: 14,
    name: "د. سلوى",
    subject: "علم البيانات",
    timeAvailable: "11:30 ص",
    theDay: "الأحد",
  },
  {
    id: 15,
    name: "د. احمد سعدي",
    subject: "علم البيانات",
    timeAvailable: "12:30 م",
    theDay: "الإثنين",
  },

  // أساتذة تقنيات الويب 3
  {
    id: 16,
    name: "د. عبد الله سليمان",
    subject: "تقنيات الويب ٣",
    timeAvailable: "12:30 م",
    theDay: "الثلاثاء",
  },
  {
    id: 17,
    name: "د. محمد احمد ايوب",
    subject: "تقنيات الويب ٣",
    timeAvailable: "9:00 ص",
    theDay: "الإثنين",
  },
  {
    id: 18,
    name: "د. انمار علي ضعيف",
    subject: "تقنيات الويب ٣",
    timeAvailable: "11:30 ص",
    theDay: "الأحد",
  },

  // أساتذة أنظمة حواسيب متقدمة
  {
    id: 19,
    name: "د. مريم عادل",
    subject: "أنظمة حواسيب متقدمة",
    timeAvailable: "9:00 ص",
    theDay: "الأحد",
  },
  {
    id: 20,
    name: "د. وليد غازي",
    subject: "أنظمة حواسيب متقدمة",
    timeAvailable: "11:30 ص",
    theDay: "الإثنين",
  },

  // أساتذة أمنية حواسيب متقدمة
  {
    id: 21,
    name: "د. سالم محمد",
    subject: "أمنية حواسيب متقدمة",
    timeAvailable: "12:30 م",
    theDay: "الثلاثاء",
  },
  {
    id: 22,
    name: "د. عبد الرحمن غيث",
    subject: "أمنية حواسيب متقدمة",
    timeAvailable: "9:00 ص",
    theDay: "الثلاثاء",
  },

  // أساتذة لغة إنكليزية
  {
    id: 23,
    name: "د. ليلى حسن",
    subject: "اللغة الانكليزية",
    timeAvailable: "9:00 ص",
    theDay: "الإثنين",
  },
  {
    id: 24,
    name: "د. سلمى محمد",
    subject: "اللغة الانكليزية",
    timeAvailable: "11:30 ص",
    theDay: "الأحد",
  },
  {
    id: 25,
    name: "د. محمد مشعان حسن",
    subject: "اللغة الانكليزية",
    timeAvailable: "12:30 م",
    theDay: "الثلاثاء",
  },

  // أساتذة ضغط البيانات
  {
    id: 26,
    name: "د. خالد احمد",
    subject: "ضغط البيانات",
    timeAvailable: "9:00 ص",
    theDay: "الثلاثاء",
  },
  {
    id: 27,
    name: "د. خالد محمود",
    subject: "ضغط البيانات",
    timeAvailable: "11:30 ص",
    theDay: "الأحد",
  },

  // أساتذة منهج البحث
  {
    id: 28,
    name: "د. رحاب سامي",
    subject: "منهج البحث",
    timeAvailable: "12:30 م",
    theDay: "الثلاثاء",
  },
  {
    id: 29,
    name: "د. ماهر علي",
    subject: "منهج البحث",
    timeAvailable: "9:00 ص",
    theDay: "الأحد",
  },
  {
    id: 30,
    name: "د. زينة علاء",
    subject: "منهج البحث",
    timeAvailable: "11:30 ص",
    theDay: "الإثنين",
  },

  // أساتذة التحليل الرياضي
  {
    id: 31,
    name: "د. حسان شريف",
    subject: "التحليل الرياضي",
    timeAvailable: "9:00 ص",
    theDay: "الثلاثاء",
  },
  {
    id: 32,
    name: "د. حسام احسان",
    subject: "التحليل الرياضي",
    timeAvailable: "12:30 م",
    theDay: "الإثنين",
  },

  // أساتذة جبر الزمر
  {
    id: 33,
    name: "د. يحيى جابر",
    subject: "جبر الزمر",
    timeAvailable: "11:30 ص",
    theDay: "الأحد",
  },
  {
    id: 34,
    name: "د. سامي طاهر",
    subject: "جبر الزمر",
    timeAvailable: "12:30 م",
    theDay: "الأحد",
  },
  {
    id: 35,
    name: "د. بركات طايس",
    subject: "جبر الزمر",
    timeAvailable: "12:30 م",
    theDay: "الإثنين",
  },

  // أساتذة معادلات تفاضلية
  {
    id: 36,
    name: "د. جمال نوري",
    subject: "معادلات تفاضلية",
    timeAvailable: "9:00 ص",
    theDay: "الثلاثاء",
  },
  {
    id: 37,
    name: "د. هالة محمود",
    subject: "معادلات تفاضلية",
    timeAvailable: "12:30 م",
    theDay: "الثلاثاء",
  },
  {
    id: 38,
    name: "د. يحيى جمال",
    subject: "معادلات تفاضلية",
    timeAvailable: "11:30 ص",
    theDay: "الأحد",
  },

  // أساتذة احصاء رياضي
  {
    id: 39,
    name: "د. محمد عبدالغني",
    subject: "احصاء رياضي",
    timeAvailable: "11:30 ص",
    theDay: "الأحد",
  },
  {
    id: 40,
    name: "د. مجد قاسم",
    subject: "احصاء رياضي",
    timeAvailable: "12:30 م",
    theDay: "الإثنين",
  },

  // أساتذة احصاء رياضي
  {
    id: 41,
    name: "د. زينب عبدالغني",
    subject: "احصاء رياضي",
    timeAvailable: "9:00 ص",
    theDay: "الأحد",
  },
  {
    id: 42,
    name: "د. مجد قاسم",
    subject: "احصاء رياضي",
    timeAvailable: "9:00 ص",
    theDay: "الإثنين",
  },

  // أساتذة فوضى بيان قابلة للتغير
  {
    id: 43,
    name: "د. أنوار صالح",
    subject: "فوضى بيان قابلة للتغير",
    timeAvailable: "11:30 ص",
    theDay: "الثلاثاء",
  },
  {
    id: 44,
    name: "د. نور معن",
    subject: "فوضى بيان قابلة للتغير",
    timeAvailable: "9:00 ص",
    theDay: "الإثنين",
  },
  {
    id: 45,
    name: "ا.د. محمد كمال الدين",
    subject: "الرياضيات المتقدمة",
    timeAvailable: "12:30 ص",
    theDay: "الثلاثاء",
  },
  {
    id: 46,
    name: "د. سيف الدين ناصر",
    subject: "الرياضيات المتقدمة",
    timeAvailable: "11:30 ص",
    theDay: "الأحد",
  },
];
