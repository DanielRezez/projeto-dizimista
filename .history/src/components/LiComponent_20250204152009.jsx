function LiComponent({ children }) {
    return (
        <li className="flex justify-between text-black text-base border-y-2 border-[#A10013] mb-2">
            {children}
        </li>
    );
}
export default LiComponent;
