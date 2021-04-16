/**
 * @jest-environment ./jest/obsidian-environment
 */

test("obsidian-outliner:select-all should select list item content", async () => {
  // arrange
  await applyState(["- one", "\t- two|"]);

  // act
  await executeCommandById("obsidian-outliner:select-all");

  // assert
  await expect(await getCurrentState()).toEqualEditorState([
    "- one",
    "\t- |two|",
  ]);
});

test("obsidian-outliner:select-all should select list whole list after second invoke", async () => {
  // arrange
  await applyState(["a", "- one", "\t- two|", "b"]);

  // act
  await executeCommandById("obsidian-outliner:select-all");
  await executeCommandById("obsidian-outliner:select-all");

  // assert
  await expect(await getCurrentState()).toEqualEditorState([
    "a",
    "|- one",
    "\t- two|",
    "b",
  ]);
});