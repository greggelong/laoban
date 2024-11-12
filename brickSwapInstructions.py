import random

def generate_all_bricks():
    """Generates all possible brick identifiers."""
    letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[:25]  # 'A' to 'Y'
    numbers = range(1, 9)
    bricks = [f"{letter} {number}" for letter in letters for number in numbers]
    return bricks

def generate_swap_pairs(bricks, num_pairs):
    """Generates unique swap pairs ensuring all bricks are swapped."""
    swaps = set()
    total_bricks = len(bricks)
    
    while len(swaps) < num_pairs:
        random.shuffle(bricks)
        for i in range(0, total_bricks, 2):
            if i + 1 < total_bricks:
                brick1 = bricks[i]
                brick2 = bricks[i + 1]
                swap_pair = tuple(sorted([brick1, brick2]))
                swaps.add(swap_pair)
                if len(swaps) >= num_pairs:
                    break
    
    return swaps

def create_swap_instructions(filename, num_pairs):
    """Creates a text file with swap instructions."""
    bricks = generate_all_bricks()
    swaps = generate_swap_pairs(bricks, num_pairs)
    with open(filename, 'w', encoding='utf-8') as file:
        for brick1, brick2 in swaps:
            chinese_line = f"注意工人们，将 {brick1} 与 {brick2} 互换。\n"
            english_line = f"Attention workers, swap {brick1} with {brick2}.\n"
            file.write(chinese_line)
            file.write(english_line)

# Number of unique swap pairs you want to generate (about 100)
num_pairs = 100
filename = 'c_swap_instructions.txt'
create_swap_instructions(filename, num_pairs)

print(f"{num_pairs} swap instructions have been written to {filename}")
