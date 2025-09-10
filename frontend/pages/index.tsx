export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/quizzes",
      permanent: false,
    },
  };
};

export default function Home() {
  return null;
}