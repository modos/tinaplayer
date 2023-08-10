import {Card, CardBody, CardFooter, IconButton, Slider} from "@material-tailwind/react";

export function Player() {
    return(
        <>
            <Card className="w-4/5 mx-auto absolute bottom-[5%] right-0 left-0">
                <CardBody className="pb-3">
                    <div className="flex items-center gap-3 text-sm">
                        <span>00:00</span>
                        <Slider size="sm" defaultValue={50} />
                        <span>00:00</span>
                    </div>
                </CardBody>
                <CardFooter className="pt-0 pb-2">
                    <div className="flex justify-between items-center">
                        <div>
                            <img
                                className="w-[48px] h-[48px] w-full rounded-lg object-cover object-center shadow-md shadow-blue-gray-900/50"
                                src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                                alt="nature image"
                            />
                        </div>
                        <div>
                            <IconButton variant="text" color="red">
                                <i className="fas fa-heart" />
                            </IconButton>
                            <IconButton variant="text">
                                <i className="fas fa-shuffle" />
                            </IconButton>
                            <IconButton variant="text" className="ml-5">
                                <i className="fas fa-backward-step" />
                            </IconButton>
                            <IconButton variant="text" size="lg" color="deep-purple">
                                <i className="fas fa-play text-lg" />
                            </IconButton>
                            <IconButton variant="text">
                                <i className="fas fa-forward-step" />
                            </IconButton>
                        </div>
                        <div className="flex items-center gap-2">
                            <Slider size="sm" defaultValue={50} className="min-w-[100px]"/>
                            <IconButton variant="text">
                                <i className="fas fa-volume-low" />
                            </IconButton>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </>
    );
}