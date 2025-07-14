import {
  FaMoneyBillWave,
  FaUserTie,
  FaSuitcaseRolling,
  FaUserFriends,
  FaRegNewspaper,
} from "react-icons/fa";

const AdminStatsCards = ({ stats }) => {
  const formatNumber = (num) => new Intl.NumberFormat("en-IN").format(num || 0);

  const cardData = [
    {
      title: "Total Payment",
      value: `৳ ${formatNumber(stats?.totalPayment)}`,
      desc: "All-time user payments",
      icon: <FaMoneyBillWave className="text-3xl text-green-400" />,
      bg: "from-green-700 to-green-400/10",
    },
    {
      title: "Total Tour Guides",
      value: formatNumber(stats?.totalTourGuides),
      desc: "Verified and active guides",
      icon: <FaUserTie className="text-3xl text-orange-400" />,
      bg: "from-orange-600/40 to-orange-400/10",
    },
    {
      title: "Total Packages",
      value: formatNumber(stats?.totalPackages),
      desc: "Available for booking",
      icon: <FaSuitcaseRolling className="text-3xl text-blue-400" />,
      bg: "from-blue-600/40 to-blue-400/10",
    },
    {
      title: "Total Clients",
      value: formatNumber(stats?.totalClients),
      desc: "Registered tourists",
      icon: <FaUserFriends className="text-3xl text-pink-400" />,
      bg: "from-pink-600/50 to-pink-400/10",
    },
    {
      title: "Total Stories",
      value: formatNumber(stats?.totalStories),
      desc: "Shared by users",
      icon: <FaRegNewspaper className="text-3xl text-yellow-400" />,
      bg: "from-yellow-600/40 to-yellow-400/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-10">
      {cardData.map((card, i) => (
        <div
          key={i}
          className={`bg-gradient-to-br ${card.bg} p-6 rounded-xl border border-white/10 shadow-lg text-white flex flex-col gap-4 hover:scale-[1.02] transition-all duration-300`}
        >
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-orange-300">
              {card.title}
            </h4>
            {card.icon}
          </div>
          <p className="text-3xl font-bold text-white">{card.value}</p>
          <p className="text-sm text-white/70">{card.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminStatsCards;
