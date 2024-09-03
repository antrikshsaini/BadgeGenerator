import React from "react";
import Draggable from "react-draggable";

interface BadgeComponentProps {
  companyName: string;
  fullName: string;
  badgeType: string;
  onCompanyNameChange: (value: string) => void;
  onFullNameChange: (value: string) => void;
}

const BadgeComponent: React.FC<BadgeComponentProps> = ({
  companyName,
  fullName,
  badgeType,
  onCompanyNameChange,
  onFullNameChange,
}) => {
  return (
    <div className="w-80 h-40 p-4 border-2 border-gray-300 rounded-lg shadow-md bg-gradient-to-r from-blue-400 to-green-400 relative">
      <Draggable>
        <input
          type="text"
          value={companyName}
          onChange={(e) => onCompanyNameChange(e.target.value)}
          placeholder="Company Name"
          className="text-white text-xl font-bold bg-transparent outline-none absolute"
          style={{ top: "10px", left: "10px" }}
        />
      </Draggable>

      <Draggable>
        <input
          type="text"
          value={fullName}
          onChange={(e) => onFullNameChange(e.target.value)}
          placeholder="Full Name"
          className="text-white text-lg font-semibold bg-transparent outline-none absolute"
          style={{ top: "60px", left: "10px" }}
        />
      </Draggable>

      <Draggable>
        <p
          className="text-white absolute"
          style={{ top: "110px", left: "10px" }}
        >
          Badge Type: <span className="font-bold">{badgeType}</span>
        </p>
      </Draggable>
    </div>
  );
};

export default BadgeComponent;
