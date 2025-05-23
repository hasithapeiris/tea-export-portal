import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  Button,
  TextInput,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "flowbite-react";
import { Spinner } from "flowbite-react";
import Swal from "sweetalert2";
import card1 from "../../assets/cards/card1.png";
import card2 from "../../assets/cards/card2.png";
import card3 from "../../assets/cards/card3.png";
import background from "./../../assets/public/background.png";

// Define interfaces for our data structures
interface CardData {
  title: string;
  description: string;
  navigateTo: string;
  image: string;
  onClick: () => void;
}

interface PredictionResponse {
  data: {
    _id: string;
    [key: string]: any;
  };
}

const PriceHome = (): JSX.Element => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [periods, setPeriods] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleGetPredictions = async (): Promise<void> => {
    if (!periods) {
      Swal.fire("Error", "Please enter the number of periods", "error");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}tea/predict`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ periods: Number.parseInt(periods) }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch predictions");
      }

      const result = (await response.json()) as PredictionResponse;

      if (result.data && result.data._id) {
        navigate(`/portal/price/prediction-details/${result.data._id}`);
      } else {
        throw new Error("Prediction ID not found in response");
      }

      setOpenModal(false);
    } catch (error) {
      Swal.fire("Error", (error as Error).message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const num = Number.parseInt(value, 10);
      if ((num >= 1 && num <= 12) || value === "") {
        setPeriods(value);
      }
    }
  };

  const cards: CardData[] = [
    {
      title: "Get Tea Price Predictions",
      description:
        "Forecast future tea prices based on market trends and historical data. Select a time period to generate accurate predictions.",
      navigateTo: "#",
      image: card1,
      onClick: () => setOpenModal(true),
    },
    {
      title: "Analyze Market Trends",
      description:
        "Explore historical tea price trends and gain insights into market fluctuations. Use past data to make informed decisions.",
      navigateTo: "/portal/price/historical-prices-list",
      image: card2,
      onClick: () => navigate("/portal/price/historical-prices-list"),
    },
    {
      title: "Browse Historical Prices",
      description:
        "Access a detailed record of past tea prices to track changes and compare market values over time.",
      navigateTo: "/portal/price/historical-prices",
      image: card3,
      onClick: () => navigate("/portal/price/historical-prices"),
    },
  ];

  return (
    <div
      className="flex min-h-screen p-4 flex-col items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-28 mt-10">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform"
            onClick={card.onClick}
          >
            <img
              src={card.image || "/placeholder.svg"}
              alt={card.title}
              className="h-96 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{card.title}</h2>
              <p className="text-gray-600">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for entering the number of periods */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Enter Forecast Period</ModalHeader>
        <ModalBody>
          <TextInput
            type="number"
            placeholder="Forecast period in months (max 12) "
            value={periods}
            onChange={handleInputChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={handleGetPredictions}
            className="w-full bg-green-600"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Submitting...</span>
              </>
            ) : (
              "Generate Forecast"
            )}
          </Button>
          <Button
            color="gray"
            onClick={() => setOpenModal(false)}
            className="w-full"
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default PriceHome;
