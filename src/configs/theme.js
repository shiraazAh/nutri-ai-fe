
// This is the ant design theme configuration of our projects design / colour scheme

import { Button } from "antd";

// Learnt from: https://ant.design/docs/react/customize-theme
export const theme = {
	components: {
		Menu: {
			itemColor: "#848D9F",
			itemSelectedColor: "#06235c",
			activeBarHeight: 0,
			darkItemSelectedBg: "#15803d",
		},
		Table: {
			headerBg: "#FFFFFF",
			borderColor: "#E0E3EA",
			headerSplitColor: "transparent",
			headerColor: "#848D9F",
			borderRadius: 0,
		},
		Segmented: {
			trackBg: "#f5f5f5",
		},
		Typography: {
			colorTextSecondary: "#848D9F",
		},
		Button: {
			defaultHoverBorderColor: "#15803d",
			defaultHoverColor: "#15803d",
		}
	},
	token: {
		// Seed Token
		colorPrimary: "#54A0FF",
		colorBgLayout: "transparent",
		colorText: "#292D32",
		colorTextDescription: "#7F879E",
		borderRadiusLG: 16,

		// Alias Token
		// colorBgContainer: "#FFFFFF",
		fontFamily:
			"-apple-system, BlinkMacSystemFont, 'Montserrat', 'Inter', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
	},
};