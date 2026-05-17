import {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getAllEntries,
} from "../../features/journal/journalSlice";

import {
  getDashboardStats,
} from "../../features/dashboard/dashboardSlice";

import Sidebar from "../../components/layout/Sidebar";

import MobileNavbar from "../../components/layout/MobileNavbar";

import MobileSidebar from "../../components/layout/MobileSidebar";

import Topbar from "../../components/layout/Topbar";

import JournalForm from "../../components/journal/JournalForm";

import JournalCard from "../../components/journal/JournalCard";

import SearchFilter from "../../components/journal/SearchFilter";

import StatsCard from "../../components/dashboard/StatsCard";

import ProductivityChart from "../../components/dashboard/ProductivityChart";

import RecentTopics from "../../components/dashboard/RecentTopics";

import SkeletonCard from "../../components/common/SkeletonCard";

import EmptyState from "../../components/common/EmptyState";

import PageWrapper from "../../components/common/PageWrapper";

import BackgroundBlobs from "../../components/common/BackgroundBlobs";

import {
  BookOpen,
  Clock3,
  TrendingUp,
} from "lucide-react";


const Dashboard = () => {

  const dispatch =
    useDispatch();

  const { user } =
    useSelector(
      (state) => state.auth
    );

  const {
    entries,
    loading,
  } = useSelector(
    (state) => state.journal
  );

  const { stats } =
    useSelector(
      (state) => state.dashboard
    );


  const [search, setSearch] =
    useState("");

  const [difficulty, setDifficulty] =
    useState("");

  const [open, setOpen] =
    useState(false);


  useEffect(() => {

    dispatch(
      getAllEntries({
        search,
        difficulty,
      })
    );

    dispatch(
      getDashboardStats()
    );

  }, [
    dispatch,
    search,
    difficulty,
  ]);


  return (

    <PageWrapper>

      <div className="min-h-screen bg-[#020617] text-white flex overflow-hidden relative">

        {/* BLOBS */}
        <BackgroundBlobs />


        {/* DESKTOP SIDEBAR */}
        <Sidebar />


        {/* MOBILE SIDEBAR */}
        <MobileSidebar
          open={open}
          setOpen={setOpen}
        />


        {/* MAIN */}
        <div className="flex-1 p-4 lg:p-10 overflow-y-auto relative z-10">

          {/* MOBILE NAVBAR */}
          <MobileNavbar
            setOpen={setOpen}
          />


          {/* TOPBAR */}
          <Topbar />


          {/* STATS */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">

            <StatsCard
              title="Total Entries"
              value={
                stats?.totalEntries || 0
              }
              icon={
                <BookOpen size={45} />
              }
              gradient="bg-gradient-to-br from-indigo-600 to-indigo-800"
            />


            <StatsCard
              title="Study Hours"
              value={
                stats?.totalStudyHours ||
                0
              }
              icon={
                <Clock3 size={45} />
              }
              gradient="bg-gradient-to-br from-cyan-600 to-cyan-800"
            />


            <StatsCard
              title="Weekly Entries"
              value={
                stats?.weeklySummary
                  ?.totalEntries || 0
              }
              icon={
                <TrendingUp size={45} />
              }
              gradient="bg-gradient-to-br from-pink-600 to-pink-800"
            />

          </div>


          {/* CHART */}
          <div className="mb-10">

            <ProductivityChart
              data={
                stats?.productivityOverview ||
                []
              }
            />

          </div>


          {/* RECENT TOPICS */}
          <div className="mb-10">

            <RecentTopics
              topics={
                stats?.recentTopics || []
              }
            />

          </div>


          {/* MAIN GRID */}
          <div className="grid xl:grid-cols-3 gap-8">

            {/* FORM */}
            <div>

              <JournalForm />

            </div>


            {/* ENTRIES */}
            <div className="xl:col-span-2">

              <SearchFilter
                search={search}
                setSearch={setSearch}
                difficulty={difficulty}
                setDifficulty={
                  setDifficulty
                }
              />


              {/* LOADING */}
              {loading ? (

                <div className="grid md:grid-cols-2 gap-6">

                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />

                </div>

              ) : entries?.length === 0 ? (

                <EmptyState
                  title="No Entries Yet"
                />

              ) : (

                <div className="grid md:grid-cols-2 gap-6">

                  {entries?.map(
                    (entry) => (

                      <JournalCard
                        key={entry._id}
                        entry={entry}
                      />

                    )
                  )}

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </PageWrapper>

  );

};

export default Dashboard;