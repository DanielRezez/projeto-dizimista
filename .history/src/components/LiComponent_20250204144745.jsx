function LiComponent({ children }) {
    return (
        <li className="text-black font-bold text-lg hover:text-yellow-400 cursor-pointer">
            {children}
        </li>
    );
}
export default LiComponent;
