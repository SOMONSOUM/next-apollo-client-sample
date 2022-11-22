import type { NextPage } from "next";
import { useRouter } from 'next/router';
import { TeacherScreen } from "../../../src/Screens/TeacherScreen/TeacherScreen";

const DashboardPage: NextPage = () => {
  const router = useRouter();

  return (
    <TeacherScreen />
  );
};

export default DashboardPage;
