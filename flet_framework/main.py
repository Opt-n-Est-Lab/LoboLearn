"""
landing_page.py: the landing page of LoboLearn.

Author: Kumar Anurag <kmranrg@unm.edu>
"""

import flet as ft
from random import randint

TEXT_COLOR = "#63666a"
PRIMARY_GREY_COLOR = "#f3f3f3"
PRIMARY_RED_COLOR = "#ba0c2f"

def main(page: ft.Page):
    page.title = "LoboLearn"
    page.padding = 20
    page.bgcolor = ft.Colors.WHITE
    page.vertical_alignment = ft.MainAxisAlignment.SPACE_BETWEEN
    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER

    # matrices
    a_matrix_value = randint(1,10)
    b_matrix_0_value = randint(1,10)
    b_matrix_1_value = randint(1,10)
    ab_matrix_0_value = a_matrix_value * b_matrix_0_value
    
    ans = ft.Text(size=20)

    ans.value = a_matrix_value * b_matrix_1_value

    def generate_random_values(e):
        a_matrix.value = randint(1,10)
        b_matrix_0.value = randint(1,10)
        b_matrix_1.value = randint(1,10)
        ab_matrix_0.value = a_matrix.value * b_matrix_0.value
        ans.value = a_matrix.value * b_matrix_1.value
        page.update()

    def check_answer(e):
        if int(user_response.value) == int(ans.value):
             result.value = "Correct answer"
             result.color = ft.Colors.GREEN_600
        else:
            result.value = "Incorrect answer"
            result.color = ft.Colors.RED_600
        page.update()

    a_matrix = ft.Text(str(a_matrix_value), size=20, color=TEXT_COLOR)
    b_matrix_0 = ft.Text(str(b_matrix_0_value), size=20, color=TEXT_COLOR)
    b_matrix_1 = ft.Text(str(b_matrix_1_value), size=20, color=TEXT_COLOR)
    ab_matrix_0 = ft.Text(str(ab_matrix_0_value), size=20, color=TEXT_COLOR)
    ab_matrix_1 = ft.Text(size=20, color=TEXT_COLOR)
    result = ft.Text(size=17)

    user_response = ft.TextField(hint_text="Missing component of A.B", border_color=ft.Colors.GREY_200, border_radius=10, border=ft.border.all(2, ft.Colors.GREY_200), color=TEXT_COLOR)

    # Top nav bar
    nav_bar = ft.Container(ft.Row(
        alignment=ft.MainAxisAlignment.SPACE_BETWEEN,
        vertical_alignment=ft.CrossAxisAlignment.CENTER,
        controls=[
            ft.Row(
                vertical_alignment=ft.CrossAxisAlignment.CENTER,
                controls=[
                    ft.Text("LOBO", spans=[ft.TextSpan("LEARN", ft.TextStyle(weight=ft.FontWeight.BOLD, color=TEXT_COLOR))], color=PRIMARY_RED_COLOR, weight=ft.FontWeight.BOLD, style=ft.TextThemeStyle.HEADLINE_MEDIUM)
                ],
            ),
            ft.Row(
                spacing=30,
                controls=[
                    ft.Text("About", size=20, color=TEXT_COLOR),
                    ft.Text("Courses", size=20, color=TEXT_COLOR),
                    ft.Text("Requests", size=20, color=TEXT_COLOR),
                ],
            ),
        ]
    ), bgcolor=PRIMARY_GREY_COLOR, border_radius=10, height=70, padding=20)

    # Rounded container
    center_box = ft.Container(
        height=700,
        width=600,
        bgcolor=ft.Colors.WHITE,
        border_radius=30,
        alignment=ft.alignment.center,
        border=ft.border.all(2, ft.Colors.GREY_200)
    )

    center_box.content = ft.Container(ft.Column(
        controls=[
            # Row with badge and question title
            ft.Row(
                [
                    ft.Container(
                        content=ft.Text("Try me!", color=ft.Colors.WHITE, size=12),
                        bgcolor=ft.Colors.GREEN_700,
                        padding=ft.padding.symmetric(horizontal=10, vertical=4),
                        border_radius=15
                    ),
                    ft.Text("Question: Matrix Multiplication", size=17, weight=ft.FontWeight.BOLD, color=TEXT_COLOR),
                ],
                spacing=10,
                alignment=ft.MainAxisAlignment.START,
            ),
            
            ft.Divider(height=2, color=ft.Colors.GREY_200),

            # Question description
            ft.Text(
                "Matrices A and B are given below, find out the missing component of dot product A.B:",
                size=17, color=TEXT_COLOR
            ),

            ft.Row([
                ft.Column([
                    ft.Column(
                        horizontal_alignment=ft.CrossAxisAlignment.CENTER,
                        controls=[
                            ft.Text(size=20, color=TEXT_COLOR),
                            ft.Container(content=ft.Text( size=20, color=TEXT_COLOR), padding=10, width=50, height=50, alignment=ft.alignment.center),
                        ],
                    ),
                    ft.Column(
                        horizontal_alignment=ft.CrossAxisAlignment.CENTER,
                        controls=[
                            ft.Text("A", size=20, color=TEXT_COLOR),
                            ft.Container(content=a_matrix, border=ft.border.all(1, color=TEXT_COLOR), padding=10, width=50, height=50, alignment=ft.alignment.center),
                        ],
                    ),
                ]),
                ft.Container(width=30),
                ft.Column([
                    ft.Text("B", size=20, color=TEXT_COLOR),
                    ft.Row(
                        controls=[
                            ft.Container(content=b_matrix_0, border=ft.border.all(1, color=TEXT_COLOR), padding=10, width=50, height=50, alignment=ft.alignment.center),
                            ft.Container(content=b_matrix_1, border=ft.border.only(right=ft.border.BorderSide(1, TEXT_COLOR), top=ft.border.BorderSide(1, TEXT_COLOR), bottom=ft.border.BorderSide(1, TEXT_COLOR)), padding=10, width=50, height=50, alignment=ft.alignment.center),
                        ],
                        alignment=ft.MainAxisAlignment.CENTER,
                        spacing=0
                    ),
                    ft.Text("A.B", size=20, color=TEXT_COLOR),
                    ft.Row(
                        controls=[
                            ft.Container(content=ab_matrix_0, border=ft.border.all(1, color=TEXT_COLOR), padding=10, width=50, height=50, alignment=ft.alignment.center),
                            ft.Container(content=ab_matrix_1, border=ft.border.only(right=ft.border.BorderSide(1, TEXT_COLOR), top=ft.border.BorderSide(1, TEXT_COLOR), bottom=ft.border.BorderSide(1, TEXT_COLOR)), padding=10, width=50, height=50, alignment=ft.alignment.center, bgcolor=ft.Colors.AMBER_50),
                        ], spacing=0
                    )
                ])
            ], alignment=ft.MainAxisAlignment.CENTER),

            ft.Container(height=10),
            
            user_response,
            result,
            # Buttons at the bottom
            ft.Row(
                [
                    ft.ElevatedButton("New variant", bgcolor=ft.Colors.GREY_100, color=PRIMARY_RED_COLOR, width=100, on_click=generate_random_values),
                    ft.ElevatedButton("Grade", bgcolor=ft.Colors.GREY_100, color=PRIMARY_RED_COLOR, width=100, on_click=check_answer),
                ],
                alignment=ft.MainAxisAlignment.END,
                spacing=10
            )
        ],
        spacing=10,
        alignment=ft.MainAxisAlignment.SPACE_BETWEEN,
    ), padding=50)


    # Footer
    footer = ft.Container(
        content=ft.Image(src="images/unm_logo_horizontal.png", height=40),
        alignment=ft.alignment.center,
        bgcolor=ft.Colors.GREY_200,
        height=70,
        border_radius=10
    )

    # Final layout
    page.add(
        nav_bar,
        ft.Container(height=20),
        center_box,
        ft.Container(height=40),
        footer
    )

ft.app(target=main, assets_dir="assets")
