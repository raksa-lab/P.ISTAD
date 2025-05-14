import { Outlet } from "react-router";
import FooterComponent from "../Nav-Foot/FooterComponent";
import NavTwoCom from "../Nav-Foot/NavTwoCom";

export default function LayoutNav2({ isLoggedIn, profile, cartItems, user }) {
  return (
    <div className="flex flex-col">
      <header>
        <NavTwoCom
          isLoggedIn={isLoggedIn}
          profile={profile}
          user={user}
          cartItems={cartItems} // Pass cartItems to NavOneCom
        />
      </header>
      <main className="mx-auto flex-grow">
        <Outlet />
      </main>
      <footer>
        <FooterComponent />
      </footer>
    </div>
  );
}
