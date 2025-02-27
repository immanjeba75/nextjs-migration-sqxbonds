export interface ApiEndpoint {
  api: string;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  baseURL: 'normal' | 'auth';
}

export const blogEndpoints: Record<string, ApiEndpoint> = {
  getAllBlogs: {
    api: "/Common/AllBlogs",
    method: "get",
    baseURL: "normal",
  },
  getBlogById: {
    api: "/blogs",  // Will append ID later
    method: "get",
    baseURL: "normal",
  },
  createBlog: {
    api: "/blogs",
    method: "post",
    baseURL: "normal",
  },
  updateBlog: {
    api: "/blogs", // Will append ID later
    method: "put",
    baseURL: "normal",
  },
  deleteBlog: {
    api: "/blogs", // Will append ID later
    method: "delete",
    baseURL: "normal",
  }
};
export const bonds: Record<string, ApiEndpoint> = {
  get: {
    api: "/Bonds",
    method: "get",
    baseURL: "auth",
  },
  getAllBonds: {
    api: "/Bonds/GetAllBonds",
    method: "get",
    baseURL: "auth",
  },
  getFullText: {
    api: "/Bonds",
    method: "get",
    baseURL: "auth",
  },
  createSearchFilter: {
    api: "/SearchFilters/CreateSearchFilter",
    method: "post",
    baseURL: "auth",
  },
  renameFilter: {
    api: "/SearchFilters/RenameSearchFilter",
    method: "put",
    baseURL: "auth",
  },
  createBondPosition: {
    api: "/PortfoliosDetails/CreatePortfolioDetails",
    method: "post",
    baseURL: "auth",
  },
  PositionPortfolioDetails: {
    api: "/Portfolios/GetPortfolioList",
    method: "get",
    baseURL: "auth",
  },
  PositionPortfolioPriceByDate: {
    api: "/Bonds/GetBondPriceByDate",
    method: "get",
    baseURL: "auth",
  },
  searchFilterDetails: {
    api: "/SearchFilters/SearchFilterDetails",
    method: "get",
    baseURL: "auth",
  },
  bondSearchFilterList: {
    api: "/SearchFilters",
    method: "get",
    baseURL: "auth",
  },
  bondOfInterest: {
    api: "/Bonds/BondOfInterest",
    method: "get",
    baseURL: "auth",
  },
  trendingFlag: {
    api: "/Bonds/TrendingFlag",
    method: "get",
    baseURL: "auth",
  },
  followBond: {
    api: "/Bonds/FollowBond",
    method: "post",
    baseURL: "auth",
  },
  bondPosition: {
    api: "/Bonds/GetBriefBondDetail",
    method: "get",
    baseURL: "auth",
  },
  bondPriceCharts: {
    api: "/Bonds/GetBondPriceGraph",
    method: "get",
    baseURL: "auth",
  },
  bondDetailToken: {
    api: "/Bonds/GetBondDetailToken",
    method: "get",
    baseURL: "auth",
  },
  sameIssuerBonds: {
    api: "/Bonds/GetIssuerBondInfo",
    method: "get",
    baseURL: "auth",
  },

  getBondHeader: {
    api: "/Bonds/GetBondHeader",
    method: "get",
    baseURL: "auth",
  },
  getBondAnalytics: {
    api: "/Bonds/GetBondAnalytics",
    method: "get",
    baseURL: "auth",
  },
  getbondsDetailData: {
    api: "/Bonds/GetBondInfo",
    method: "get",
    baseURL: "auth",
  },
  getIssuerList: {
    api: "/Bonds/GetIssuerByFirstLetter",
    method: "get",
    baseURL: "auth",
  },
  getIssuerFirstLetterList: {
    api: "/Bonds/GetIssuerFirstLetter",
    method: "get",
    baseURL: "auth",
  },
  getIssuerHistory: {
    api: "/Bonds/GetIssuerHistory",
    method: "post",
    baseURL: "auth",
  },
  getIssuerListByChar: {
    api: "/Bonds/GetIssuerByFirstLetter",
    method: "get",
    baseURL: "auth",
  },
};