import UserRow from "./UserRow";

const UserTable = ({ users, handleUpdate }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
    <div className="overflow-x-auto">
      <table className="table w-full border-separate border-spacing-0">
        <thead className="bg-slate-800/50 text-sky-400 uppercase tracking-widest">
          <tr>
            <th className="py-5 pl-8">#</th>
            <th>User Details</th>
            <th>Role</th>
            <th>Status</th>
            <th className="text-center pr-8">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {users.map((user, index) => (
            <UserRow
              key={user._id}
              user={user}
              index={index}
              handleUpdate={handleUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default UserTable;
