Feature: Calculator

  Background:
    Given a user opens the app

  Scenario: Default display screen
    Then in the display screen should be show: 0
    And all buttons shouldn't be highlighted except: null
    And all buttons should be enabled except: +/- 0

  Scenario Outline: Clicking non-operators screen buttons
    Given the display has the value: <numberOnScreen>
    When the user press the button: <button>
    Then in the display screen should be show: <resultDisplay>

    Examples:
      | numberOnScreen | button | resultDisplay |
      | 1              | 0      | 10            |
      | 0              | 1      | 1             |
      | 0              | 2      | 2             |
      | 0              | 3      | 3             |
      | 0              | 4      | 4             |
      | 0              | 5      | 5             |
      | 0              | 6      | 6             |
      | 0              | 7      | 7             |
      | 0              | 8      | 8             |
      | 0              | 9      | 9             |
      | 0              | ,      | 0,            |
      | 1              | C      | 0             |
      | 173            | C      | 0             |
      | 1              | +/-    | -1            |

  Scenario Outline: Clicking operators screen buttons
    And the user press the button: 1
    When the user press the button: <button>
    Then all buttons shouldn't be highlighted except: <button>

    Examples:
      | button |
      | +      |
      | -      |
      | /      |
      | *      |

  Scenario Outline: Unhighlighting operators screen buttons
    When the user press the button: <button>
    Then all buttons shouldn't be highlighted except: null

    Examples:
      | button |
      | =      |
      | C      |

  Scenario Outline: Pressing non-operators keys
    Given the display has the value: <numberOnScreen>
    When the user press the key: <key>
    Then in the display screen should be show: <resultDisplay>

    Examples:
      | numberOnScreen | key        | resultDisplay |
      | 1              | 0          | 10            |
      | 0              | 1          | 1             |
      | 0              | 2          | 2             |
      | 0              | 3          | 3             |
      | 0              | 4          | 4             |
      | 0              | 5          | 5             |
      | 0              | 6          | 6             |
      | 0              | 7          | 7             |
      | 0              | 8          | 8             |
      | 0              | 9          | 9             |
      | 0              | ,          | 0,            |
      | 1              | ESC        | 0             |
      | -1             | Left Ctrl  | 1             |
      | -1             | Right Ctrl | 1             |
      | 1              | Right Ctrl | -1            |
      | 1              | Left Ctrl  | -1            |

  Scenario Outline: Pressing operators keys
    And the user press the key: 1
    When the user press the key: <key>
    Then all buttons shouldn't be highlighted except: <key>

    Examples:
      | key |
      | +   |
      | -   |
      | /   |
      | *   |

  Scenario: Doing an operation with keyboard
    And the user press the key: 2
    And the user press the key: +
    And the user press the key: 3
    When the user press the key: Enter
    Then in the display screen should be show: 5

  Scenario Outline: Writing numbers
    Given the display has the value: <numberOnScreen>
    When the user press the button: <button>
    Then in the display screen should be show: <resultDisplay>

    Examples:
      | numberOnScreen | button | resultDisplay |
      | 0              | 0      | 0             |
      | 7              | 0      | 70            |
      | 0              | 1      | 1             |
      | 123            | 4      | 1234          |
      | 1234           | 8      | 12348         |
      | 0              | ,      | 0,            |
      | 1234           | ,      | 1234,         |
      | 1234,          | 1      | 1234,1        |
      | 1234,1         | ,      | 1234,1        |
      | 0              | +/-    | 0             |
      | 0,             | +/-    | 0,            |
      | 13,            | +/-    | -13,          |
      | -13,           | +/-    | 13,           |
      | -0,5           | +/-    | 0,5           |
      | 0,5            | +/-    | -0,5          |
      | 7              | +/-    | -7            |
      | 1234           | +/-    | -1234         |
      | -1234          | +/-    | 1234          |

  Scenario Outline: Writing more than 10 digits
    Given the display has the value: <numberOnScreen>
    When the user press the button: <button>
    Then in the display screen should be show: <resultDisplay>

    Examples:
      | numberOnScreen | button | resultDisplay |
      | 1234567890     | 7      | 1234567890    |
      | 1234567890     | +/-    | -1234567890   |
      | 1234567890     | ,      | 1234567890    |
      | 123456789      | ,      | 123456789,    |
      | 123456789,     | 5      | 123456789,5   |
      | 123456789,5    | +/-    | -123456789,5  |

  Scenario Outline: Performing two number operations
    Given the display has the value: <numberOnScreen>
    When the user press the button: <operator>
    And the user writes the number: <secondNumber>
    And the user press the button: =
    Then in the display screen should be show: <resultDisplay>

    Examples:
      | numberOnScreen | operator | secondNumber | resultDisplay |
      | 24             | +        | 6            | 30            |
      | 24,2           | +        | 6,4          | 30,6          |
      | 13,14          | +        | 2,781        | 15,921        |
      | 10             | +        | -5           | 5             |
      | -20            | +        | 10           | -10           |
      | 24             | -        | 6            | 18            |
      | 6              | -        | 24           | -18           |
      | 6              | -        | -24          | 30            |
      | 24,2           | -        | 6,4          | 17,8          |
      | 13,14          | -        | 2,781        | 10,359        |
      | 10             | *        | 8            | 80            |
      | 5,2            | *        | 8            | 41,6          |
      | 36,25          | *        | 7,496        | 271,73        |
      | 10             | *        | -8           | -80           |
      | -10            | *        | -8           | 80            |
      | -10            | *        | 8            | -80           |
      | 10             | /        | 2            | 5             |
      | 84             | /        | 4,3          | 19,53488372   |
      | 23,58          | /        | 10,14        | 2,325443787   |
      | 10             | /        | -2           | -5            |
      | -10            | /        | 2            | -5            |
      | -10            | /        | -2           | 5             |

  Scenario Outline: Before clicking the equal button
    Given the display has the value: <numberOnScreen>
    When the user press the button: <operator>
    And the user writes the number: <secondNumber>
    Then in the display screen should be show: <resultDisplay>

    Examples:
      | numberOnScreen | operator | secondNumber | resultDisplay |
      | 24             | +        | 6            | 6             |
      | 24,2           | -        | 6,4          | 6,4           |
      | 13,14          | *        | 2,781        | 2,781         |
      | 84             | /        | -4,3         | -4,3          |

  Scenario Outline: Performing two number operations with a result number with more than 10 non-decimal digits
    Given the display has the value: <numberOnScreen>
    When the user press the button: <operator>
    And the user writes the number: <secondNumber>
    And the user press the button: =
    Then in the display screen should be show: ERROR

    Examples:
      | numberOnScreen | operator | secondNumber |
      | 9999999999     | +        | 1            |
      | -1             | -        | 9999999999   |
      | 9999999999     | *        | 2            |
      | 9999999999     | /        | 0,1          |

  Scenario: Clicking the C button
    When the user press the button: C
    Then in the display screen should be show: 0
    And all buttons shouldn't be highlighted except: null
    And all buttons should be enabled except: +/- 0

  Scenario: Pressing the escape key
    When the user press the key: Escape
    Then in the display screen should be show: 0
    And all buttons shouldn't be highlighted except: null
    And all buttons should be enabled except: +/- 0

  Scenario Outline: Clicking two different operation buttons
    Given the display has the value: <firstNumber>
    When   the user press the button: <button>
    And the user press the button: <button2>
    And the user writes the number: <secondNumber>
    When the user press the button: =
    Then in the display screen should be show: <resultDisplay>

    Examples:
      | firstNumber | button | button2 | secondNumber | resultDisplay |
      | 12          | +      | /       | 6            | 2             |
      | 1234        | -      | +       | 31           | 1265          |
      | 9,26        | *      | *       | 2,15         | 19,909        |

  Scenario Outline: Doing a new operation
    Given the display has the value: <firstNumber>
    When the user press the button: <button>
    And the user writes the number: <secondNumber>
    When the user press the button: =
    Then in the display screen should be show: <resultDisplay>
    And the user writes the number: <thirdNumber>
    Then in the display screen should be show: <thirdNumber>

    Examples:
      | firstNumber | button | secondNumber | resultDisplay | thirdNumber |
      | 12,2        | +      | 6            | 18,2          | 13          |
      | 1234567890  | +      | 1            | 1234567891    | -24         |

  Scenario Outline: Using the previous result in a new operation
    Given the display has the value: <firstNumber>
    When the user press the button: <button>
    And the user writes the number: <secondNumber>
    And the user press the button: =
    And in the display screen should be show: <resultDisplay>
    And the user press the button: <button2>
    And the user writes the number: <thirdNumber>
    And the user press the button: =
    Then in the display screen should be show: <resultDisplay2>

    Examples:
      | firstNumber | button | secondNumber | resultDisplay | button2 | thirdNumber | resultDisplay2 |
      | 12,2        | +      | 6            | 18,2          | +       | 13          | 31,2           |
      | 123         | -      | -24,8        | 147,8         | *       | 12          | 1773,6         |
      | 1234567890  | /      | -2,5         | -493827156    | -       | 147         | -493827303     |

  Scenario Outline: Division with 0
    Given the display has the value: <numberOnScreen>
    And the user press the button: /
    And the user writes the number: 0
    When the user press the button: =
    Then in the display screen should be show: ERROR

    Examples:
      |numberOnScreen|
      |             1|
      |            -1|
      |             0|
