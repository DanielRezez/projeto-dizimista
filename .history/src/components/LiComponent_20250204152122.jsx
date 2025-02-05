function LiComponent({ children }) {
    return (
        <li className="flex justify-between text-black text-base border-t-1 border-[#A10013] first:border-t-2 last:border-b-2">
            {children}
        </li>
    );
}
export default LiComponent;
