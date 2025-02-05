function LiComponent({ children }) {
    return (
        <li className="flex justify-between text-black text-base border-t-2 border-[#A10013] last:border-b-2">
            {children}
        </li>
    );
}
export default LiComponent;
