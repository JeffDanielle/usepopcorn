import Search from "./Search";
import Logo from "./Logo"
import NumResults from "./NumResults";
const Navbar = ({ children }) => {

    return (
        <nav className="nav-bar">
            <Logo />
            {children}
        </nav>
    );
}

export default Navbar;