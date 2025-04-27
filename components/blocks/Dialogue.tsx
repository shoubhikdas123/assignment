'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import html from "@/public/images/html.png"
import Image from "next/image"
import { useEffect, useState } from "react"

interface UpdateScoresDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  onSave: (data: { rank: string; percentile: string; currentScore: string }) => void;
}

export function UpdateScoresDialog({ open, setOpen, onSave }: UpdateScoresDialogProps) {
  const [rank, setRank] = useState("1");
  const [percentile, setPercentile] = useState("20");
  const [currentScore, setCurrentScore] = useState("11");
  const [percentileError, setPercentileError] = useState(false);
  const [rankError, setRankError] = useState(false);
  const [currentScoreError, setCurrentScoreError] = useState(false);

  const handleSave = () => {
    onSave({ rank, percentile, currentScore });
    resetForm();
  }

  const resetForm = () => {
    setRank("1");
    setPercentile("20");
    setCurrentScore("11");
    setPercentileError(false);
    setCurrentScoreError(false);
    setRankError(false);
  };

  useEffect(() => {
    if (!percentile) setPercentileError(true);
    if (!rank) setRankError(true);
    if (!currentScore) setCurrentScoreError(true);
  }, [percentile, rank, currentScore]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg w-full">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            Update scores
            <Image className="w-8 h-8" alt="html" src={html} />
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Rank */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-medium">
              1
            </div>
            <Label htmlFor="rank" className="flex-1">
              Update your <span className="font-bold">Rank</span>
            </Label>
            <div className="w-full sm:w-40 flex flex-col">
              <Input
                id="rank"
                required
                value={rank}
                onChange={(e) => { setRank(e.target.value); setRankError(false) }}
                placeholder="Rank"
                className={rankError ? "border-red-500" : "border-blue-300"}
              />
              {rankError && (
                <p className="text-red-500 text-xs mt-1">
                  required : rank 1-100
                </p>
              )}
            </div>
          </div>

          {/* Percentile */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-medium">
              2
            </div>
            <Label htmlFor="percentile" className="flex-1">
              Update your <span className="font-bold">Percentile</span>
            </Label>
            <div className="w-full sm:w-40 flex flex-col">
              <Input
                id="percentile"
                required
                value={percentile}
                onChange={(e) => { setPercentile(e.target.value); setPercentileError(false) }}
                placeholder="Percentile"
                className={percentileError ? "border-red-500" : "border-blue-300"}
              />
              {percentileError && (
                <p className="text-red-500 text-xs mt-1">
                  required : percentile 0-100
                </p>
              )}
            </div>
          </div>

          {/* Current Score */}
          <div className="flex items-center gap-4">
  {/* Circle */}
  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-medium">
    3
  </div>

  {/* Label text */}
  <div className="flex-1">
    <Label htmlFor="currentScore" className="block">
      Update your <span className="font-bold">Current Score (out of 15)</span>
    </Label>
  </div>

  {/* Input */}
  <div className="w-40">
    <Input
      id="currentScore"
      required
      placeholder="Current Score"
      value={currentScore}
      onChange={(e) => {
        setCurrentScore(e.target.value);
        setCurrentScoreError(false);
      }}
      className={` ${currentScoreError ? "border-red-500" : "border-blue-300"}`}
    />
    {/* Error Message */}
    {currentScoreError && (
      <p className="text-red-500 text-xs mt-1">
        required | number
      </p>
    )}
  </div>
</div>

        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2">
          <Button variant="outline" onClick={() => setOpen(false)} className="w-full sm:w-auto">Cancel</Button>
          <Button type="submit" onClick={handleSave} className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white">Save ➔</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
