function LiComponent({ children }) {
    return (
        <li className="flex between text-black text-base border-t-2 border-[#A10013]">
            {children}
        </li>
    );
}
export default LiComponent;
