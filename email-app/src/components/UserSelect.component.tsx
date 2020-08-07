import React from "react";

interface UserSelectProps {
  users: string[];
  currentUser: string;
  handleChangeUser: (user: string) => () => void;
}

export default function UserSelect({
  users,
  currentUser,
  handleChangeUser,
}: UserSelectProps) {
  return (
    <div className='dropdown'>
      <button
        className='btn btn-secondary dropdown-toggle'
        type='button'
        id='dropdownMenuButton'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'
      >
        {currentUser}
      </button>
      <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
        {users.map((user: any, index: number) => (
          <a
            className='dropdown-item'
            href='#'
            key={index}
            onClick={handleChangeUser(user)}
          >
            {user}
          </a>
        ))}
      </div>
    </div>
  );
}
