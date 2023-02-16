const BackgroundDecoration = () => (
  <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
    <svg
      className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
      viewBox="0 0 1155 678"
    >
      <path
        d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
        fill="url(#f4773080-2a16-4ab4-9fd7-579fec69a4f7)"
        fillOpacity=".2"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="f4773080-2a16-4ab4-9fd7-579fec69a4f7"
          x1="1155.49"
          x2="-78.208"
          y1=".177"
          y2="474.645"
        >
          <stop stopColor="#9089FC" />
          <stop offset={1} stopColor="#FF80B5" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export default BackgroundDecoration;
