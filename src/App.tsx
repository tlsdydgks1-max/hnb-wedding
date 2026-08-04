import "./App.css";
import { Hero } from "./components/Hero";
import { Invitation } from "./components/Invitation";
import { Gallery } from "./components/Gallery";
import { WeddingCalendar } from "./components/WeddingCalendar";
import { Location } from "./components/Location";
import { WeddingInfo } from "./components/WeddingInfo";
import { Account } from "./components/Account";
import { Guestbook } from "./components/Guestbook";
import { GuestbookDialog } from "./components/GuestbookDialog";
import { ShareButtons } from "./components/ShareButtons";
import { Profile } from "./components/Profile";
import { Attendance } from "./components/Attendance";

function App() {
  const theme = import.meta.env.VITE_APP_THEME || "classic";

  if (window.Kakao && !window.Kakao.isInitialized()) {
    window.Kakao.init("04684303ae3d01f4d5b36492b3326ea8");
  }

  return (
    <div className="w-full" data-theme={theme}>
      <main className="flex flex-col items-center w-full overflow-x-hidden">
        <Hero />

        <Invitation />

        <Gallery />

        <WeddingCalendar />

        <Location />

        <WeddingInfo />

        <Attendance />

        <Account />

        <Guestbook />

        <Profile />

        <ShareButtons />
      </main>
      <GuestbookDialog />
    </div>
  );
}

export default App;
