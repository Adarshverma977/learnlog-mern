import {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  motion,
} from "framer-motion";

import Sidebar from "../../components/layout/Sidebar";

import MobileNavbar from "../../components/layout/MobileNavbar";

import MobileSidebar from "../../components/layout/MobileSidebar";

import PageWrapper from "../../components/common/PageWrapper";

import BackgroundBlobs from "../../components/common/BackgroundBlobs";

import {
  getProfile,
  updateProfile,
  uploadPhoto,
} from "../../features/profile/profileSlice";

import {
  Camera,
  Mail,
  User,
} from "lucide-react";


const Profile = () => {

  const dispatch =
    useDispatch();

  const { profile } =
    useSelector(
      (state) => state.profile
    );

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [preview, setPreview] =
    useState("");

  const [open, setOpen] =
    useState(false);


  useEffect(() => {

    dispatch(getProfile());

  }, []);


  useEffect(() => {

    if (profile) {

      setName(profile.name);

      setEmail(profile.email);

    }

  }, [profile]);


  const handleSubmit = (e) => {

    e.preventDefault();

    dispatch(
      updateProfile({
        name,
        email,
      })
    );

  };


  const handleImage = (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    setPreview(
      URL.createObjectURL(file)
    );

    const formData =
      new FormData();

    formData.append(
      "profilePhoto",
      file
    );

    dispatch(
      uploadPhoto(formData)
    );

  };


  return (

    <PageWrapper>

      <div className="min-h-screen bg-[#020617] text-white flex relative overflow-hidden">

        {/* BLOBS */}
        <BackgroundBlobs />


        {/* SIDEBAR */}
        <Sidebar />


        {/* MOBILE SIDEBAR */}
        <MobileSidebar
          open={open}
          setOpen={setOpen}
        />


        {/* MAIN */}
        <div className="flex-1 p-4 lg:p-10 relative z-10 overflow-y-auto">

          {/* MOBILE NAV */}
          <MobileNavbar
            setOpen={setOpen}
          />


          {/* HEADER */}
          <div className="mb-10">

            <h1 className="text-5xl lg:text-6xl font-black">

              Account

              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">

                {" "}Settings

              </span>

            </h1>

            <p className="text-slate-400 mt-4 text-lg">

              Manage your profile and
              personal information.

            </p>

          </div>


          {/* PROFILE CARD */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl"
          >

            <div className="flex flex-col lg:flex-row items-center gap-10">

              {/* IMAGE */}
              <div className="relative">

                <img
                  src={
                    preview ||
                    `http://localhost:5000/${profile?.profilePhoto}`
                  }
                  alt=""
                  className="w-44 h-44 rounded-full object-cover border-4 border-indigo-500 shadow-2xl"
                />


                <label className="absolute bottom-2 right-2 bg-gradient-to-r from-indigo-600 to-cyan-500 p-3 rounded-full cursor-pointer shadow-lg">

                  <Camera />

                  <input
                    type="file"
                    hidden
                    onChange={
                      handleImage
                    }
                  />

                </label>

              </div>


              {/* INFO */}
              <div>

                <h2 className="text-5xl font-black">

                  {profile?.name}

                </h2>

                <p className="text-slate-400 mt-3 text-lg">

                  {profile?.email}

                </p>

              </div>

            </div>

          </motion.div>


          {/* UPDATE FORM */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl mt-10"
          >

            <h2 className="text-4xl font-black mb-8">

              Update Information

            </h2>


            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* NAME */}
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5">

                <User className="text-slate-400" />

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  className="w-full bg-transparent p-5 outline-none"
                />

              </div>


              {/* EMAIL */}
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5">

                <Mail className="text-slate-400" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  className="w-full bg-transparent p-5 outline-none"
                />

              </div>


              {/* BUTTON */}
              <button
                className="bg-gradient-to-r from-indigo-600 to-cyan-500 hover:scale-[1.02] transition-all px-10 py-5 rounded-2xl font-bold text-lg"
              >
                Save Changes
              </button>

            </form>

          </motion.div>

        </div>

      </div>

    </PageWrapper>

  );

};

export default Profile;