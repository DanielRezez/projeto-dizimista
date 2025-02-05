function LiComponent({ children }) {
    return (
        <li className="flex between gap-4 text-black text-base border-t-2 border-[#A10013]">
            {children}
        </li>
    );
}
export default LiComponent;
