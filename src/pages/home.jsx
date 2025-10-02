import Cards from "../assets/components/cards";

export default function Home() {
  return <Cards endpoint="random.php" count={15} />;
}
