import React, { useState } from 'react';

interface TooltipProps {
    children: React.ReactNode;
    content: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
    const [visible, setVisible] = useState(false);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
                <div className={`${visible ? "block" : "hidden"} transition-all absolute z-10 bg-gray-800 text-white text-xs rounded-lg py-2 px-3 -mt-8 left-full ms-2 text-nowrap`}>
                    {content}
                </div>
        </div>
    );
};

export default Tooltip;