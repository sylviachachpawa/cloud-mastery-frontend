import TitleBar from "./components/common/TitleBar";

export default function Home() {
  return (
    <>
      <TitleBar
        title="Dashboard"
        buttonLabel="Export Reports"
        buttonLink="/api/reports/export"
        showDateRange={true}
      />
     </>
  );
}
