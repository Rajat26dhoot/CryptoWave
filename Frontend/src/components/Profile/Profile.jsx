import SecondNavbar from '../Navbar/SecondNavbar';
import Footer from '../Footer/Footer';
import { useSelector } from 'react-redux';

const Profile = () => {

  const auth = useSelector(state => state.auth);


  return (
    <div>
      <div className="min-h-screen flex items-center justify-center p-4 mt-10">
        <div className="max-w-6xl w-full grid grid-cols-[1.5fr_1fr] gap-6">
          {/* Profile Card - Left Side (Wider) */}
          <div className="bg-black/30 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-6 text-white">
  <div className="flex items-center gap-4">
    <img
      src="https://static.agentestudio.com/uploads/author/photo/1/andrew_headshot.jpg"
      alt="Profile"
      className="w-24 h-24 rounded-full object-cover border border-white/10"
    />
    <div className="w-full space-y-3">
      <div>
        <label className="text-gray-400 text-sm">User Name:</label>
        <div className="w-full bg-black/40 text-white border border-white/10 rounded-lg px-4 py-2">
          {auth.user?.username || 'N/A'}
        </div>
      </div>
      <div>
        <label className="text-gray-400 text-sm">Mobile Number:</label>
        <div className="w-full bg-black/40 text-white border border-white/10 rounded-lg px-4 py-2">
          +1-856-569-999-1236
        </div>
      </div>
      <div>
        <label className="text-gray-400 text-sm">Email:</label>
        <div className="w-full bg-black/40 text-white border border-white/10 rounded-lg px-4 py-2">
          {auth.user?.email || 'N/A'}
        </div>
      </div>
      <div>
        <label className="text-gray-400 text-sm">City:</label>
        <div className="w-full bg-black/40 text-white border border-white/10 rounded-lg px-4 py-2">
          New York
        </div>
      </div>
      <div>
        <label className="text-gray-400 text-sm">Country:</label>
        <div className="w-full bg-black/40 text-white border border-white/10 rounded-lg px-4 py-2">
          United States
        </div>
      </div>
      <div>
        <label className="text-gray-400 text-sm">Date of Birth:</label>
        <div className="w-full bg-black/40 text-white border border-white/10 rounded-lg px-4 py-2">
          1990-12-12
        </div>
      </div>
    </div>
  </div>
</div>


          {/* Right Side - Contains Verification and Password Change */}
          <div className="flex flex-col gap-4">
            {/* 2 Step Verification */}
            <div className="bg-black/30 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-4 text-white">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">2 Step Verification</h2>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <button className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-3 py-1 rounded-full shadow-md hover:opacity-90">
                    Disabled
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <button className="bg-gradient-to-r from-green-400 to-lime-500 text-white px-3 py-1 rounded-full shadow-md hover:opacity-90">
                    Enabled
                  </button>
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div className="bg-black/30 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-4 text-white">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">Change Password</h2>
              </div>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-black/40 text-white border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-green-400"
                  required
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full bg-black/40 text-white border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-green-400"
                  required
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full bg-black/40 text-white border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-green-400"
                  required
                />
                <button
                  type="submit"
                  className="mt-2 bg-gradient-to-r from-green-400 to-lime-500 text-black px-4 py-2 rounded-full w-full shadow-md hover:opacity-90"
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
