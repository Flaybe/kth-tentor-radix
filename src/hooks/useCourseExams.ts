import { API_ENDPOINTS } from "../api/endpoints";
import { fetcher } from "../api/fetchers";
import useSWR from "swr";

export interface CourseExam {
  id: number;
  course_code: string;
  exam_date: string;
  pdf_url: string;
  exam_name: string;
  has_solution: boolean;
  statistics: {
    A?: number;
    B?: number;
    C?: number;
    D?: number;
    E?: number;
    F?: number;
    Fx?: number;
    P?: number;
  };
  pass_rate: number;
}

export interface CourseData {
  course_code: string;
  course_name_swe: string;
  course_name_eng: string;
  exams: CourseExam[];
}

export const useCourseExams = (courseCode: string) => {
  const { data, error, isLoading } = useSWR(
    courseCode ? API_ENDPOINTS.courseExams(courseCode) : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  if (courseCode === "SF1624") {
    return {
      courseData: {
        course_code: "SF1624",
        course_name_swe: "Algebra och geometri",
        course_name_eng: "Algebra and Geometry",
        exams: [
          {
            id: 12345,
            course_code: "SF1624",
            exam_date: "2024-03-15",
            pdf_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            exam_name: "Tenta 2024-03-15",
            has_solution: true,
            statistics: {
              A: 10,
              B: 15,
              C: 20,
              D: 15,
              E: 10,
              F: 5,
              Fx: 2,
              P: 0,
            },
            pass_rate: 91.5,
          },
        ],
      } as CourseData,
      isLoading: false,
      isError: null,
    };
  }

  return {
    courseData: data as CourseData | undefined,
    isLoading,
    isError: error,
  };
};
