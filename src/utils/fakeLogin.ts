type UserData = {
  name: string;
  email: string;
  image: string | null;
};

type SessionData = {
  user: UserData | null;
  expires: string;
};

export type SessionResponse = {
  data: SessionData | null;
  status: string;
};

export const fakeSignInWithSocials = async (session: SessionResponse) => {
  if (session) {
    const data = {
      user: { email: "admin", image: null, name: "admin" },
      expires: "2024-06-01T12:01:09.332Z",
    };
    session.data = data;
    session.status = "authenticated";
  }
};
