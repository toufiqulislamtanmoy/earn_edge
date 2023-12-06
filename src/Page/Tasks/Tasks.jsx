import { useEffect, useState } from "react";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/tasks")
            .then((res) => res.json())
            .then((data) => {
                setTasks(data);
            });
    }, []);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-4">Available Tasks</h1>
            <div className="flex flex-wrap -mx-4">
                {tasks.map((task) => (
                    <div
                        key={task.name}
                        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
                    >
                        <div className="bg-white rounded-lg overflow-hidden shadow-lg h-full flex flex-col">
                            <img
                                src={task.banner}
                                alt={task.name}
                                className="w-full h-32 object-cover mb-4"
                            />
                            <div className="flex-grow p-6">
                                <h2 className="text-xl font-bold mb-2">
                                    {task.name}
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    {task.description}
                                </p>
                                <p className="text-green-500 font-bold">
                                    Reward: {task.reward} euros
                                </p>
                                {task.referringTask && (
                                    <p className="text-blue-500 font-bold">
                                        Referral Reward: {task.referringReward} euros
                                    </p>
                                )}
                            </div>
                            <a
                                href={task.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-500 text-white py-2 px-4 rounded-full mt-4 inline-block hover:bg-blue-700 transition duration-300"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tasks;
