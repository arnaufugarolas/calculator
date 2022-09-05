Feature: Calculator

  Background:
Given a user opens the app

Scenario: Default display screen
  Then in the display screen should be show a 0
  And no button should be highlighted
  And all buttons should be enabled except +/- and 0

Scenario Outline: Clicking non-operators screen buttons
  Given in the display screen the number <numberOnScreen> is shown
  When the user press the <Button> button
  Then in the display screen should be show a <resultDisplay>

  Examples:
    |numberOnScreen|Button| resultDisplay |
    |             1|   0  |            10 |
    |             0|   1  |             1 |
    |             0|   2  |             2 |
    |             0|   3  |             3 |
    |             0|   4  |             4 |
    |             0|   5  |             5 |
    |             0|   6  |             6 |
    |             0|   7  |             7 |
    |             0|   8  |             8 |
    |             0|   9  |             9 |
    |             0|   ,  |            0, |
    |             1|   C  |             0 |
    |           173|   C  |             0 |
    |             1| +/-  |           -1  |

Scenario Outline: Clicking operators screen buttons
  When the user press the <button> button
  Then just the operator <button> button should be highlighted

  Examples:
    |button|
    |   +  |
    |   -  |
    |   /  |
    |   *  |

Scenario Outline: Unhighlighting operators screen buttons
  When the user press the <button> button
  Then all the operators buttons should be unhighlighted

  Examples:
    |button|
    |   =  |
    |   C  |

  Scenario Outline: Pressing non-operators keys
    Given in the display screen the number <numberOnScreen> is shown
    When the user press the <Key> key
    Then in the display screen should be show a <resultDisplay>

    Examples:
      |numberOnScreen|Key   | resultDisplay |
      |             1|   0  |            10 |
      |             0|   1  |             1 |
      |             0|   2  |             2 |
      |             0|   3  |             3 |
      |             0|   4  |             4 |
      |             0|   5  |             5 |
      |             0|   6  |             6 |
      |             0|   7  |             7 |
      |             0|   8  |             8 |
      |             0|   9  |             9 |
      |             0|   ,  |            0, |
      |             1|  ESC |             0 |
      |            -1|  Left Ctrl |             1 |
      |            -1| Right Ctrl |             1 |
      |             1| Right Ctrl |            -1 |
      |             1|  Left Ctrl |            -1 |

Scenario Outline: Pressing operators keys
  When the user press the <Key> key
  Then the <Key> button should be highlighted

  Examples:
    |Key   |
    |   +  |
    |   -  |
    |   /  |
    |   *  |
