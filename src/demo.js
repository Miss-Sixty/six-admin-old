let nums = [2, 7, 11, 15];
//  target = 9

function filter(nums, target) {
  for (let i in nums) {
    if (nums.indexOf(target - nums[i]) !== -1) {
      console.log(i);
    }
  }
}

filter(nums, 22);
