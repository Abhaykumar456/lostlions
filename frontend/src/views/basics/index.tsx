
import { FC } from "react";
import { SendTransaction } from '../../components/SendTransaction';
import { notify } from "../../utils/notifications";



export const BasicsView: FC = ({ }) => {

  return (
    <div className="hero mx-auto p-4 min-h-16 py-4">
      <div className="hero-content flex flex-col max-w-lg">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#FAD836] to-[#47833C]">
          Rules
        </h1>
        <p>
          Welcome to LostLions Plinko. To play, you must own a LostLion NFT. 
        </p>
        <p>
          Rules of play:
        </p>
        <p>
          Wager one of your lions for a chance to upgrade your lion to "breedable" status.
          The odds of winning are 50/50. Losing Lions will be burned. 
        </p>
        {/* CONTENT GOES HERE */}
        <div className="p-2 text-center">
          <div className="flex items-stretch">
            <div>
            <SendTransaction />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
