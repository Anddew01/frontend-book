import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginForm from "../layout/LoginForm";
import RegisterForm from "../layout/RegisterForm";
import useAuth from "../hooks/useAuth";
import Header from "../layout/Header";
import UserHome from "../layout/UserHome";
import BorrowBookForm from "../layout/Borrow";
import AddBookForm from "../layout/AddBookForm";
import MemberForm from "../layout/MemberForm";
import BookList from "../layout/BookManagement";
import MemberManagement from "../layout/MemberManagement";
import BorrowManagement from "../layout/BorrowManagement";

const guestRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <>
          <Header />
          <Outlet />
        </>
      ),
      children: [
        { index: true, element: <LoginForm /> },
        { path: "/register", element: <RegisterForm /> },
      ],
    },
  ],
  { forceRefresh: true }
);

const userRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <>
          <Header />
          <Outlet />
        </>
      ),
      children: [
        { index: true, path: "/home", element: <UserHome /> },
        { path: "/borrow", element: <BorrowBookForm /> },
        { path: "/borrowList", element: <BorrowManagement /> },
        { path: "/book", element: <AddBookForm /> },
        { path: "/bookList", element: <BookList /> },
        { path: "/member", element: <MemberForm /> },
        { path: "/memberList", element: <MemberManagement /> },
      ],
    },
  ],
  { forceRefresh: true }
);

export default function AppRouter() {
  const { user } = useAuth();
  const finalRouter = user?.id ? userRouter : guestRouter;
  return <RouterProvider router={finalRouter} />;
}
