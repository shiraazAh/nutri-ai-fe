import React, { useState } from "react";
import { Avatar, FloatButton, List, Skeleton } from "antd";
import { Card } from "antd";
import { addCalories, capitalizeFirstLetters } from "../../helpers";
import { motion } from "framer-motion"
import { Badge } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
const AiResponseCard = ({ data, isLoading, setData, calories, getCalories }) => {
    const loadingData = [{content: "Loading..."}]
    const {userData} = useAuth();

    const handleUserCalorieAddition = async (calories) => {
        await addCalories(calories, userData.sub, userData.name);
        await getCalories();
    }
  return (
    <>
      {data.length > 0 &&
        data.map((item, index) => {
          let totalCalories = 0;

          if (item.calories) {
            //add the calories
            Object.keys(item.calories).forEach((key) => {
              totalCalories += item.calories[key];
            });
          }

          const updateDecision = () => {
            const newData = [...data];
            newData[index].isDecided = true;
            setData(newData);
          };

          return (
            <Card key={`card-${index}`} className="shadow-md mb-4">
              <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                <div className="d-flex">
                  <p className="mb-2">{item.content}</p>
                </div>
                <div className="flex justify-between flex-wrap">
                  <div>
                    {Object.keys(item.calories).map((key, index) => (
                      <Badge
                        key={`badge-${index}-${key}`}
                        className="mr-2"
                        count={`${capitalizeFirstLetters(key)}: ${
                          item.calories[key]
                        } kcal `}
                        color="#52c41a"
                      />
                    ))}
                  </div>
                  {item.isDecided === false && (
                    <div className="flex justify-around relative mt-2 ml-auto">
                      <FloatButton
                        className="block relative bottom-0 right-0 mr-4 border-solid shadow-md"
                        onClick={() => updateDecision()}
                        icon={<CloseOutlined />}
                        tooltip={<div>Don't Add To Calorie Count</div>}
                      />
                      <FloatButton
                        className="block relative bottom-0 right-0 border-solid shadow-md"
                        icon={<CheckOutlined />}
                        onClick={() => {
                          handleUserCalorieAddition(totalCalories + calories);
                          updateDecision();
                        }}
                        tooltip={<div>Add to Calorie Count</div>}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            </Card>
          );
        })}
      {isLoading && (
        <motion.div animate={{ y: 0 }} initial={{ y: 50 }}>
          <Card className="shadow-md mb-4">
            <Skeleton active />
          </Card>
        </motion.div>
      )}
    </>
  );
};
export default AiResponseCard;
