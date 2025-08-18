// Test timestamp parsing
const testBattleTime = "20250812T000914.000Z";

console.log("Testing timestamp parsing...");
console.log("Original battleTime:", testBattleTime);

try {
  const battleTime = new Date(testBattleTime);
  console.log("Parsed Date object:", battleTime);
  console.log("getTime():", battleTime.getTime());
  console.log("isNaN check:", isNaN(battleTime.getTime()));
  
  if (!isNaN(battleTime.getTime())) {
    const timestamp = Math.floor(battleTime.getTime() / 1000);
    console.log("Unix timestamp:", timestamp);
    const discordTimestamp = `<t:${timestamp}:R>`;
    console.log("Discord timestamp:", discordTimestamp);
  } else {
    console.log("Date is invalid!");
  }
} catch (error) {
  console.error("Error parsing battle time:", error);
}

// Test with different formats
const testCases = [
  "20250812T000914.000Z",
  "2025-08-12T00:09:14.000Z",
  "2025-08-12T00:09:14Z",
  "20250812T000914Z"
];

console.log("\nTesting different formats:");
testCases.forEach((testCase, index) => {
  console.log(`\nTest ${index + 1}: "${testCase}"`);
  try {
    const date = new Date(testCase);
    console.log("  Parsed:", date);
    console.log("  Valid:", !isNaN(date.getTime()));
    if (!isNaN(date.getTime())) {
      const timestamp = Math.floor(date.getTime() / 1000);
      console.log("  Unix timestamp:", timestamp);
    }
  } catch (error) {
    console.log("  Error:", error.message);
  }
});
