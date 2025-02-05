function LiComponent({ children }) {
    return (
        <li className="flex justify-between px-4 py-2 text-black text-base border-t-1 border-[#A10013] first:border-t-2 last:border-b-1 odd:bg-[#EDDBB8] even:bg-transparent">
            {children}
        </li>
    );
}
export default LiComponent;
