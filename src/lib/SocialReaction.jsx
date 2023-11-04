import React, { Suspense, useState } from "react";
import { reactionEmoji } from "../config/EMOJI";
import { useNavigate } from "react-router-dom";
import CommentCount from "./CommentCount";
import useToken from "../hooks/useToken";
import {
  useAddSocialReactionMutation,
  useGetSocialReactionsQuery,
} from "../feature/socialReaction/socialReactionApiSlice";

const SocialReaction = ({ item }) => {
  const navigate = useNavigate();
  const { userId } = useToken();
  const [emojiSelection, setEmojiSelection] = useState("");
  const [num, setNum] = useState(0);
  const [showEmoji, setShowEmoji] = useState(false);

  let thumbsUp = 0;
  if (emojiSelection === "thumbsUp") {
    thumbsUp = num;
  }

  let wow = 0;
  if (emojiSelection === "wow") {
    wow = num;
  }

  let heart = 0;
  if (emojiSelection === "heart") {
    heart = num;
  }

  let laugh = 0;
  if (emojiSelection === "laugh") {
    laugh = num;
  }

  const keyValuePairs = Object.entries(reactionEmoji);
  const displayEmoji = keyValuePairs.map(([key, value]) => {
    return (
      <button
        key={key}
        onClick={() => {
          setEmojiSelection(key);
          setNum(1);
        }}
        className="m-0.5 mt-0 mb-0 px-1 border border-white shadow-sm shadow-inherit rounded-full text-xl bg-white hover:shadow-lg hover:shadow-black "
      >
        {value}
      </button>
    );
  });

  // work on submit to database
  const [addSocialReaction, { isSuccess, reset }] =
    useAddSocialReactionMutation();
  const handleSubmitReaction = async () => {
    try {
      await addSocialReaction({
        user: userId,
        item: item?._id,
        thumbsUp: thumbsUp,
        wow: wow,
        heart: heart,
        laugh: laugh,
      });
      // reset();
      setShowEmoji(false);
    } catch (error) {
      console.error(error);
    }
  };

  const { socialReactions } = useGetSocialReactionsQuery("listSocialReaction", {
    selectFromResult: ({ data }) => ({
      socialReactions: data?.ids?.map((id) => data?.entities[id]),
    }),
  });

  const itemSocialReactions = socialReactions?.filter(
    (socialReaction) => socialReaction?.item?._id === item?._id
  );

  const wowCount =
    Number(
      itemSocialReactions?.reduce((prev, cur) => {
        const wows = cur?.reactions?.wow;
        return prev + wows;
      }, 0)
    ) || 0;

  const thumbsUpCount =
    Number(
      itemSocialReactions?.reduce((prev, cur) => {
        const thumbs = cur?.reactions?.thumbsUp;
        return prev + thumbs;
      }, 0)
    ) || 0;
  const heartCount =
    Number(
      itemSocialReactions?.reduce((prev, cur) => {
        const hearts = cur?.reactions?.heart;
        return prev + hearts;
      }, 0)
    ) || 0;
  const laughCount =
    Number(
      itemSocialReactions?.reduce((prev, cur) => {
        const laughs = cur?.reactions?.laugh;
        return prev + laughs;
      }, 0)
    ) || 0;

  const total = thumbsUpCount + wowCount + heartCount + laughCount;
  console.log(total);

  return (
    <>
      <div className="p-1">
        <div className="p-1 pt-2  bg-white border-b border-t border-gray-200 mb-1 cursor-default flex flex-row relative items-center justify-between text-blue-900">
          {total > 0 ? (
            <p className="bg-sky-700 px-1 rounded-full absolute left-1 top-2">
              👍
            </p>
          ) : (
            "0 Like"
          )}
          <div className="flex flex-row items-center ml-6">
            {wowCount !== 0 && <p className="-ml-2">😮</p>}
            {heartCount !== 0 && <p className="-ml-2">❤️</p>}
            {laughCount !== 0 && <p className="-ml-2">🤣</p>}
            <p className="bg-white rounded-full pl-1">
              {total !== 0 ? total : ""}
            </p>
          </div>
          <Suspense fallback="comments loading...">
            <CommentCount item={item} />
          </Suspense>
        </div>

        {showEmoji && (
          <div
            onMouseLeave={() => setShowEmoji(false)}
            onClick={handleSubmitReaction}
            className="flex flex-row p-1 border-1 hover:bg-gradient-to-l  bg-gradient-to-r from-cyan-500 to-blue-500 mt-1 mb-1 shadow-sm shadow-black rounded-md text-blue-900"
          >
            {displayEmoji}
          </div>
        )}
        {userId && (
          <>
            {!showEmoji && (
              <div className="relative p-1 pt-2 border-b border-gray-200 bg-white  text-blue-900">
                <div className="flex items-center justify-between">
                  <div className="hover:shadow-md hover:shadow-orange-400 cursor-pointer">
                    <span className="text-xl">👍</span>
                    <button
                      disabled={showEmoji}
                      onClick={() => setShowEmoji(true)}
                    >
                      Like
                    </button>
                  </div>

                  <div
                    onClick={() => navigate(`/dash/items/${item?.id}/single`)}
                    className=" cursor-pointer hover:shadow-md hover:shadow-orange-400"
                  >
                    <span className="text-xl">✍️</span>
                    <span> Comment</span>
                  </div>

                  <div className=" cursor-pointer pr-2 hover:shadow-md hover:shadow-orange-400">
                    <span>🔂</span>
                    <span> Share</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SocialReaction;
