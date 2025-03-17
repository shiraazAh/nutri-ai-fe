import { useState } from 'react';
import AiResponseCard from './cards/AiResponseCard';
import { FloatButton, Input } from "antd";
import { OpenAIOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { Typography } from 'antd';
import { useAuth } from './context/AuthContext';
import { useEffect } from 'react';
import { Divider } from 'antd';
import { api_url } from '../configs/crud';
const { TextArea } = Input;

function Dashboard() {
  const {userData} = useAuth();
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [calories, setCalories] = useState(0);

  useEffect(() => {
    if(userData)
      getCalories();
  }, [userData]);

  const getCalories = async () => {
    try {
      const response = await fetch(
        `${api_url}/calories/${userData.sub}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // ...
        }
      );
      const data = await response.json();
      if(data) setCalories(data.totalCalories);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPrompt("");
    setIsLoading(true);

    try {
      const response = await fetch(`${api_url}/calories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: prompt }),
        // ...
      });
      const data = await response.json();
      setResponses([...responses, {...data, ...(Object.keys(data.calories).length > 0 && {isDecided: false})}]);
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred while processing your request.");
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white sm:rounded-lg p-6">
        <h1 className="text-xl  text-center mb-6">
          Hello {userData.name} 👋, Your Overall Calorie Count is {calories}{" "}
          Kcal
        </h1>
        {responses.length == 0 && !isLoading && (
          <>
            <h2 className="text-2xl font-bold text-center mb-8">
              Nutri AI - Your Nutrition Assistant
            </h2>
            {/* For Large Screens */}
            <div className="flex justify-center flex-wrap mb-8 hidden sm:flex">
              <Typography.Paragraph
                type="secondary"
                className="text-center flex-1"
              >
                Ask Nutri AI nutritional Information of any food item. If you
                require more information about the food item, ask more
                questions.
              </Typography.Paragraph>
              <Divider
                type="vertical"
                style={{ height: "auto", borderRadius: "10px" }}
              />
              <Typography.Paragraph
                type="secondary"
                className="text-center flex-1"
              >
                We have a personal calorie count feature. Tell Nutri Ai what you
                ate and add it to your overall calorie count by clicking the
                button with the checkmark icon.
              </Typography.Paragraph>
              <Divider type="vertical" style={{ height: "auto" }} />
              <Typography.Paragraph
                type="secondary"
                className="text-center flex-1"
              >
                To give an example you can tell Nutri AI "I ate a McDonalds
                Cheese burger with fries and a small regular coke"
              </Typography.Paragraph>
            </div>
            {/* For Small Screens */}
            <div className="flex justify-center flex-wrap mb-8 sm:hidden">
              <Typography.Paragraph
                type="secondary"
                className="text-center flex-1"
              >
                Ask Nutri AI nutritional Information of any food item. If you
                require more information about the food item, ask more
                questions.

                We have a personal calorie count feature. You can tell Nutri Ai what you
                ate and add it to your overall calorie count by clicking the
                button with the checkmark icon.

                To give an example you can tell Nutri AI "I ate a McDonalds
                Cheese burger with fries and a small regular coke"
              </Typography.Paragraph>
            </div>
          </>
        )}

        <AiResponseCard
          data={responses}
          isLoading={isLoading}
          setData={setResponses}
          calories={calories}
          getCalories={getCalories}
        />
        <Card className="relative shadow-xl p-0 mt-3">
          <TextArea
            className="no-border-textarea"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onPressEnter={prompt && handleSubmit}
            placeholder="Ask nutrtional information or tell Nutri AI what you ate."
            autoSize={{
              minRows: 1,
            }}
          />
          <FloatButton
            className="relative bottom-0 right-0 ms-auto"
            tooltip="Generate Response"
            icon={<OpenAIOutlined style={{ color: "#15803d" }} />}
            onClick={prompt && handleSubmit}
          />
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;