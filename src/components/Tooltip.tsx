import clsx from 'clsx';

interface TooltipProps {
    className?: string;
    children: React.ReactNode;
    content: string;
}

const Tooltip = ({ children, content, className }: TooltipProps) => {
    return (
        <div
            className={clsx("relative inline-block group", className)}
        >
            {children}
            <div className={`group-hover:block! hidden transition-all absolute z-10 bg-gray-800 text-white text-xs rounded-lg py-2 px-3 -mt-8 left-full ms-2 text-nowrap`}>
                {content}
            </div>
        </div>
    );
};

export default Tooltip;