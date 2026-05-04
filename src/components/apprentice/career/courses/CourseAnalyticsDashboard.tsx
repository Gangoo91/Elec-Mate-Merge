import { courseAnalytics } from './enhancedCoursesData';

const CourseAnalyticsDashboard = () => {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        UK course market insights
      </span>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Available courses
          </span>
          <div className="text-[18px] font-semibold text-white">{courseAnalytics.totalCourses}</div>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Training providers
          </span>
          <div className="text-[18px] font-semibold text-white">
            {courseAnalytics.totalProviders}
          </div>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Average rating
          </span>
          <div className="text-[18px] font-semibold text-white">
            {courseAnalytics.averageRating}
          </div>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            High demand
          </span>
          <div className="text-[18px] font-semibold text-white">
            {courseAnalytics.highDemandCourses}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            High demand skills
          </span>
          <div className="text-[18px] font-semibold text-white">
            {courseAnalytics.highDemandCourses}
          </div>
          <p className="text-[12px] text-white/70">
            Courses in high demand — essential for career progression.
          </p>
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Emerging tech
          </span>
          <div className="text-[18px] font-semibold text-white">
            {courseAnalytics.emergingTechCourses}
          </div>
          <p className="text-[12px] text-white/70">
            Future-ready courses with high salary impact potential.
          </p>
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Salary impact
          </span>
          <div className="text-[16px] font-semibold text-white">
            {courseAnalytics.averageSalaryImpact}
          </div>
          <p className="text-[12px] text-white/70">Average annual increase based on industry data.</p>
        </div>
      </div>

      <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Most popular course categories
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {courseAnalytics.topCategories.map((category, idx) => (
            <div
              key={idx}
              className="flex items-baseline justify-between rounded-md border border-white/10 bg-white/[0.03] px-3 py-2"
            >
              <span className="text-[13px] text-white/85">{category.name}</span>
              <span className="text-[12px] text-white/85 font-mono">{category.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          UK market trends
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-2">
            <p className="text-[13px] text-white">Growing demand</p>
            <ul className="space-y-1 text-[13px] text-white/85">
              <li>EV charging installation</li>
              <li>Smart building automation</li>
              <li>Renewable energy systems</li>
              <li>Data centre electrical work</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-[13px] text-white">Skills shortage areas</p>
            <ul className="space-y-1 text-[13px] text-white/85">
              <li>Testing & inspection qualified electricians</li>
              <li>Industrial automation specialists</li>
              <li>ATEX certified professionals</li>
              <li>Project management qualified electricians</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAnalyticsDashboard;
